import { mapWithConcurrency } from './map-with-concurrency.util.js';

// Deferred promise: permite mantener llamadas "en vuelo" y resolverlas a mano,
// que es lo único que prueba de verdad el límite de concurrencia.
function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (err: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

describe('mapWithConcurrency', () => {
  it('preserva el orden del array de salida aunque los items terminen desordenados', async () => {
    const items = [30, 10, 20, 0];
    const result = await mapWithConcurrency(items, 2, async (ms) => {
      await new Promise((r) => setTimeout(r, ms));
      return ms * 2;
    });

    expect(result).toEqual([60, 20, 40, 0]);
  });

  it('pasa el índice de cada item a fn', async () => {
    const result = await mapWithConcurrency(['a', 'b', 'c'], 2, (item, index) =>
      Promise.resolve(`${index}:${item}`),
    );

    expect(result).toEqual(['0:a', '1:b', '2:c']);
  });

  it('nunca tiene más de `limit` llamadas en vuelo', async () => {
    const gates = Array.from({ length: 5 }, () => deferred<number>());
    let inFlight = 0;
    let maxInFlight = 0;

    const pending = mapWithConcurrency(gates, 2, async (gate) => {
      inFlight++;
      maxInFlight = Math.max(maxInFlight, inFlight);
      const value = await gate.promise;
      inFlight--;
      return value;
    });

    // Arrancan sólo 2; el 3.º no entra hasta que uno de los dos resuelve.
    await Promise.resolve();
    expect(maxInFlight).toBe(2);

    gates.forEach((gate, i) => gate.resolve(i));
    await expect(pending).resolves.toEqual([0, 1, 2, 3, 4]);
    expect(maxInFlight).toBe(2);
  });

  it('propaga el rechazo de fn (fail-fast, como Promise.all)', async () => {
    await expect(
      mapWithConcurrency([1, 2, 3], 2, (n) =>
        n === 2 ? Promise.reject(new Error('boom')) : Promise.resolve(n),
      ),
    ).rejects.toThrow('boom');
  });

  it('devuelve un array vacío sin invocar fn cuando no hay items', async () => {
    const fn = vi.fn();

    await expect(mapWithConcurrency([], 4, fn)).resolves.toEqual([]);
    expect(fn).not.toHaveBeenCalled();
  });

  it('trata un limit < 1 como secuencial en vez de colgarse', async () => {
    const result = await mapWithConcurrency([1, 2, 3], 0, (n) =>
      Promise.resolve(n * 10),
    );

    expect(result).toEqual([10, 20, 30]);
  });
});

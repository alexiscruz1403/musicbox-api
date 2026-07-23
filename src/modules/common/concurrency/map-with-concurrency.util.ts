// `Promise.all(items.map(...))` sobre una lista de tamaño arbitrario abre
// tantas queries concurrentes como items haya, y cada una toma una conexión del
// pool de Prisma. Con listas grandes (los tracks de un álbum, la hidratación
// del historial) eso satura el pool y, detrás de él, el pooler de Supabase
// (EMAXCONNSESSION). Este helper corre `fn` sobre `items` con como máximo
// `limit` promesas en vuelo, preservando el orden del array de salida.
//
// Semántica de errores igual a `Promise.all`: el primer rechazo se propaga
// (fail-fast); si el llamador necesita tolerar fallos, debe capturarlos dentro
// de `fn`.
export async function mapWithConcurrency<T, R>(
  items: readonly T[],
  limit: number,
  fn: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length);
  // Índice compartido: cada worker toma el siguiente pendiente al terminar el
  // suyo, así un item lento no bloquea al resto (a diferencia de trocear el
  // array en bloques fijos).
  let next = 0;

  const worker = async (): Promise<void> => {
    while (next < items.length) {
      const index = next++;
      results[index] = await fn(items[index], index);
    }
  };

  const workers = Math.min(Math.max(limit, 1), items.length);
  await Promise.all(Array.from({ length: workers }, () => worker()));
  return results;
}

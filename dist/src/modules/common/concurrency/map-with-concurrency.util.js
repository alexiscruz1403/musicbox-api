export async function mapWithConcurrency(items, limit, fn) {
    const results = new Array(items.length);
    let next = 0;
    const worker = async () => {
        while (next < items.length) {
            const index = next++;
            results[index] = await fn(items[index], index);
        }
    };
    const workers = Math.min(Math.max(limit, 1), items.length);
    await Promise.all(Array.from({ length: workers }, () => worker()));
    return results;
}
//# sourceMappingURL=map-with-concurrency.util.js.map
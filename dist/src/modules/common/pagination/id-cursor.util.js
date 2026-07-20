const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export function encodeIdCursor(id) {
    return Buffer.from(id).toString('base64');
}
export function decodeIdCursor(cursor) {
    if (!cursor)
        return undefined;
    const decoded = Buffer.from(cursor, 'base64').toString('utf8');
    return UUID_RE.test(decoded) ? decoded : undefined;
}
export function paginate(rows, take) {
    const hasMore = rows.length > take;
    const items = hasMore ? rows.slice(0, take) : rows;
    const nextCursor = hasMore
        ? encodeIdCursor(items[items.length - 1].id)
        : null;
    return { items, nextCursor };
}
//# sourceMappingURL=id-cursor.util.js.map
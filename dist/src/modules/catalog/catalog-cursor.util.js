const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export function encodeCatalogCursor(id) {
    return Buffer.from(id).toString('base64');
}
export function decodeCatalogCursor(cursor) {
    if (!cursor)
        return undefined;
    const decoded = Buffer.from(cursor, 'base64').toString('utf8');
    return UUID_RE.test(decoded) ? decoded : undefined;
}
//# sourceMappingURL=catalog-cursor.util.js.map
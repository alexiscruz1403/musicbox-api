import {
  decodeAllCursor,
  decodeFollowedCursor,
  encodeAllCursor,
  encodeFollowedCursor,
} from './feed-cursor.util.js';

const VALID_UUID = '3f6a1e2b-8c4d-4b7a-9e2f-1a2b3c4d5e6f';

describe('feed-cursor.util', () => {
  describe('encodeFollowedCursor / decodeFollowedCursor', () => {
    it('round-trips a valid review id', () => {
      const encoded = encodeFollowedCursor(VALID_UUID);
      expect(decodeFollowedCursor(encoded)).toBe(VALID_UUID);
    });

    it('returns undefined for an undefined cursor', () => {
      expect(decodeFollowedCursor(undefined)).toBeUndefined();
    });

    it('rejects an ALL-mode JSON cursor (cross-mode mismatch)', () => {
      const foreignCursor = encodeAllCursor({ phase: 'S', id: VALID_UUID });
      expect(decodeFollowedCursor(foreignCursor)).toBeUndefined();
    });

    it('rejects malformed/garbage input', () => {
      expect(decodeFollowedCursor('not-a-valid-cursor!!!')).toBeUndefined();
    });
  });

  describe('encodeAllCursor / decodeAllCursor', () => {
    it('round-trips for each phase, with and without an id', () => {
      for (const phase of ['S', 'T', 'R'] as const) {
        expect(decodeAllCursor(encodeAllCursor({ phase }))).toEqual({
          phase,
          id: undefined,
        });
        expect(
          decodeAllCursor(encodeAllCursor({ phase, id: VALID_UUID })),
        ).toEqual({ phase, id: VALID_UUID });
      }
    });

    it('returns a fresh cursor for undefined input', () => {
      expect(decodeAllCursor(undefined)).toEqual({
        phase: 'S',
        id: undefined,
      });
    });

    it('falls back to fresh start for a legacy FOLLOWED plain-id cursor', () => {
      const legacyCursor = encodeFollowedCursor(VALID_UUID);
      expect(decodeAllCursor(legacyCursor)).toEqual({
        phase: 'S',
        id: undefined,
      });
    });

    it('falls back to fresh start for malformed base64/JSON', () => {
      expect(decodeAllCursor('%%%not-base64%%%')).toEqual({
        phase: 'S',
        id: undefined,
      });
    });

    it('falls back to fresh start for an unrecognized phase value', () => {
      const bad = Buffer.from(
        JSON.stringify({ phase: 'X', id: VALID_UUID }),
      ).toString('base64');
      expect(decodeAllCursor(bad)).toEqual({ phase: 'S', id: undefined });
    });
  });
});

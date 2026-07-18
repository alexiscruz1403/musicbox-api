import { registerDecorator, type ValidationOptions } from 'class-validator';

// Accepts only multiples of 0.25 (1, 1.25, 1.5, ..., 10) — not arbitrary
// decimals. Multiplying by 4 turns a valid rating into a whole number;
// a small epsilon absorbs binary floating-point rounding (e.g. 8.75 * 4
// can come out as 34.999999999999996), docs/fase-3-features.md.
export function IsQuarterPointRating(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isQuarterPointRating',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown): boolean {
          if (typeof value !== 'number' || !Number.isFinite(value)) {
            return false;
          }
          const quarters = value * 4;
          return Math.abs(Math.round(quarters) - quarters) < 1e-9;
        },
        defaultMessage(): string {
          return `${propertyName} debe ser un múltiplo de 0.25`;
        },
      },
    });
  };
}

import { registerDecorator } from 'class-validator';
export function IsQuarterPointRating(validationOptions) {
    return function (object, propertyName) {
        registerDecorator({
            name: 'isQuarterPointRating',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value) {
                    if (typeof value !== 'number' || !Number.isFinite(value)) {
                        return false;
                    }
                    const quarters = value * 4;
                    return Math.abs(Math.round(quarters) - quarters) < 1e-9;
                },
                defaultMessage() {
                    return `${propertyName} debe ser un múltiplo de 0.25`;
                },
            },
        });
    };
}
//# sourceMappingURL=quarter-point-rating.validator.js.map
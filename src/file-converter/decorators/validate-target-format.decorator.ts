import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isSeparatorRequired } from 'src/shared/utils/validation.util';

/**
 * Decorator that validates the target format of a property.
 *
 * This decorator checks if the target format requires separator fields.
 * If the target format requires separators, it ensures that the separators are provided.
 */

@ValidatorConstraint({ async: false })
export class ValidateTargetFormatConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments) {
    const separators = args.object['separators'];

    if (!value) return false; // If no value is provided, skip validation

    if (!isSeparatorRequired(value)) {
      return true; // If no separator is required, skip validation
    }

    return !!separators;
  }

  defaultMessage() {
    return 'Separator is required for this target format';
  }
}

export function ValidateTargetFormat(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ValidateTargetFormatConstraint,
    });
  };
}

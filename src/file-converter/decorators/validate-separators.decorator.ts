import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isSeparatorRequired } from '../../shared/utils/validation.util';

@ValidatorConstraint({ async: false })
export class ValidateSeparatorsConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments) {
    const targetFormat = args.object['targetFormat'];

    if (!value) return true; // If no value is provided, skip validation

    if (isSeparatorRequired(targetFormat)) {
      const { segmentSeparator, elementSeparator } = value;

      // Separator values should not be the same and should not be empty
      return (
        segmentSeparator &&
        elementSeparator &&
        segmentSeparator !== elementSeparator
      );
    }
  }

  defaultMessage() {
    return 'segmentSeparator and elementSeparator should not be the same';
  }
}

export function ValidateNestedSeparators(
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ValidateSeparatorsConstraint,
    });
  };
}

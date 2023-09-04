import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from "class-validator";

@ValidatorConstraint({ name: "rating field validation" })
class IsValidRatingFieldConstraint implements ValidatorConstraintInterface {
  validate(
    value: number,
    validationArguments?: ValidationArguments | undefined
  ): boolean | Promise<boolean> {
    const stringifiedNumber = value + "";

    const isValidNumber =
      value < 5 && value > 0 && stringifiedNumber.length <= 3;
    return isValidNumber;
  }
}
export function IsValidRatingField(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsValidRatingFieldConstraint,
      constraints: [],
    });
  };
}

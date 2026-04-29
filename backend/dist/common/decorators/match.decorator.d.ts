import { ValidationOptions, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class MatchConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments): boolean;
}
export declare function Match(property: string, validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;

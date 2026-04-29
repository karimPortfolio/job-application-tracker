import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from "class-validator";
import { Model } from "mongoose";
import { ApplicationDocument } from "src/applications/applications.schema";
export declare class IsApplicationEmailUniqueConstraint implements ValidatorConstraintInterface {
    private readonly applicationsModel;
    constructor(applicationsModel: Model<ApplicationDocument>);
    validate(email: string, args: ValidationArguments): Promise<boolean>;
    defaultMessage(args: ValidationArguments): string;
}
export declare function IsApplicationEmailUnique(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;

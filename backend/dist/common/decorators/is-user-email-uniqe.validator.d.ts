import { ValidatorConstraintInterface, ValidationArguments, ValidationOptions } from 'class-validator';
import { Model } from 'mongoose';
import { UserDocument } from '../../users/user.schema';
export declare class IsUserEmailUniqueConstraint implements ValidatorConstraintInterface {
    private readonly usersModel;
    constructor(usersModel: Model<UserDocument>);
    validate(email: string): Promise<boolean>;
    defaultMessage(args: ValidationArguments): string;
}
export declare function IsUserEmailUnique(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;

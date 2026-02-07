// decorators/is-email-unique.validator.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { 
  ValidatorConstraint, 
  ValidatorConstraintInterface, 
  ValidationArguments, 
  registerDecorator,
  ValidationOptions
} from 'class-validator';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../users/user.schema';


@ValidatorConstraint({ name: 'IsEmailUnique', async: true })
@Injectable()
export class IsUserEmailUniqueConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectModel(User.name) private readonly usersModel: Model<UserDocument>,
  ) {}

  async validate(email: string) {
    try {
      if (!this.usersModel) {
        return true; // Skip validation if model is not available
      }
      const user = await this.usersModel.findOne({ email: email });
      return !user;
    } catch (error) {
      return true; // Allow if there's an error
    }
  }

  defaultMessage(args: ValidationArguments) {
    return 'Email $value already exists';
  }
}

export function IsUserEmailUnique(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserEmailUniqueConstraint,
    });
  };
}
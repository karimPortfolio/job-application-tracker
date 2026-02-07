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
import { Application, ApplicationDocument } from '../../applications/applications.schema';


@ValidatorConstraint({ name: 'IsEmailUnique', async: true })
@Injectable()
export class IsApplicationEmailUniqueConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectModel(Application.name) private readonly applicationsModel: Model<ApplicationDocument>,
  ) {}

  async validate(email: string) {
    const application = await this.applicationsModel.findOne({ email: email });
    console.log(application);
    return !application;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Email $value already exists';
  }
}

export function IsApplicationEmailUnique(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsApplicationEmailUniqueConstraint,
    });
  };
}
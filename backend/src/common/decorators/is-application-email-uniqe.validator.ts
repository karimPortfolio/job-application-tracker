import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Model } from "mongoose";
import { Application, ApplicationDocument } from "src/applications/applications.schema";

@ValidatorConstraint({ name: 'IsEmailUnique', async: true })
@Injectable()
export class IsApplicationEmailUniqueConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectModel(Application.name) private readonly applicationsModel: Model<ApplicationDocument>,
  ) {}

  async validate(email: string, args: ValidationArguments): Promise<boolean> {
    // Access the full DTO object to get the job ID
    const dto = args.object as any;
    const jobId = dto.job; 

    if (!jobId || !email) {
      return true; // Let @IsNotEmpty handle missing fields
    }

    try {
      // Normalize email for comparison
      const existingApplication = await this.applicationsModel.findOne({ 
        email: email.toLowerCase().trim(), 
        job: jobId 
      }).lean(); // .lean() for better performance (JSON-only)

      return !existingApplication;
    } catch (error) {
      // If DB fails, we block the application to be safe
      return false; 
    }
  }

  defaultMessage(args: ValidationArguments) {
    return 'You have already applied for this position with this email address.';
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
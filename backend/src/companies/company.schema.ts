import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({ timestamps: true })
export class Company {
  @Prop({ required: true, maxLength: 255 })
  name: string;

  @Prop({ required: true, maxLength: 255 })
  industry: string;

  @Prop({
    required: false,
    maxlength: 255,
  })
  websiteUrl?: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);

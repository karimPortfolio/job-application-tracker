import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class PasswordReset extends Document {
  @Prop({ required: true, index: true })
  email: string;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  expiresAt: Date;
}

export const PasswordResetSchema =
  SchemaFactory.createForClass(PasswordReset);

// Automatically remove expired tokens
PasswordResetSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 },
);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class EmailVerification extends Document {
    @Prop({ required: true, index: true })
    email: string;

    @Prop({ required: true })
    token: string;

    @Prop({ required: true })
    expiresAt: Date;
}

export const EmailVerificationSchema =
    SchemaFactory.createForClass(EmailVerification);

// Automatically remove expired tokens
EmailVerificationSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 },
);

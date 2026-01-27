import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { formatDistanceToNow } from 'date-fns';
import { HydratedDocument, Types } from 'mongoose';
import leanVirtuals from 'mongoose-lean-virtuals';
import { Company } from '../companies/company.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
  toObject: {
    virtuals: true,
  },
})
export class User {
  @Prop({ required: true, maxLength: 255 })
  name: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true, maxLength: 255, minLength: 8 })
  password: string;

  @Prop({ type: String, enum: ['local', 'google'], default: 'local' })
  provider: 'local' | 'google';

  @Prop({ type: String, unique: true, sparse: true, default: undefined })
  googleId?: string | null;

  @Prop({ type: Types.ObjectId, ref: 'Company', default: null })
  company: Company | Types.ObjectId | null;

  @Prop({ type: Date, default: null })
  emailVerifiedAt: Date | null;

  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('createdAtDiff').get(function (this: UserDocument) {
  if (!this.createdAt) return null;
  return formatDistanceToNow(new Date(this.createdAt), { addSuffix: true });
});

UserSchema.plugin(leanVirtuals);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { formatDistanceToNow } from 'date-fns';
import leanVirtuals from 'mongoose-lean-virtuals';

export type DepartmentDocument = HydratedDocument<Department>;

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
export class Department {
  @Prop() title: string;
  @Prop({ type: String }) description: string;
  @Prop({ type: String, ref: 'Company' }) company: string;
  @Prop({ type: String, ref: 'User' }) user: string;

  createdAt: Date;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);

DepartmentSchema.virtual('createdAtDiff').get(function (this: DepartmentDocument) {
  const createdAt = this.createdAt ?? (this as any)?.createdAt;
  if (!createdAt) return null;
  return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
});
// Apply leanVirtuals before paginate so paginated lean queries include virtuals.
DepartmentSchema.plugin(leanVirtuals);
DepartmentSchema.plugin(mongoosePaginate);

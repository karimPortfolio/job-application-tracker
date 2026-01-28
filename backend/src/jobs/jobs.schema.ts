import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { formatDistanceToNow } from 'date-fns';
import { HydratedDocument, Types } from 'mongoose';
import { Company } from '../companies/company.schema';
import { Department } from '../departments/departments.schema';
import { User } from '../users/user.schema';
import leanVirtuals from 'mongoose-lean-virtuals';
import mongoosePaginate from 'mongoose-paginate-v2';


export type JobDocument = HydratedDocument<Job>;

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
export class Job {
  @Prop() title: string;
  @Prop() description: string;
  @Prop() country: string;
  @Prop() city?: string;
  @Prop({
    enum: ['draft', 'published', 'closed', 'archived'],
    default: 'draft',
  })
  status: string;
  @Prop() employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
  @Prop() experienceLevel: 'junior' | 'mid' | 'senior' | 'lead';
  @Prop({ default: false }) isRemote: boolean;
  @Prop() salaryMin?: number;
  @Prop() salaryMax?: number;
  @Prop({ default: 0 }) applicationsCount: number;
  @Prop({ default: 0 }) viewsCount: number;
  //==== intentionally using string IDs for compatibility with auth context & guards
  @Prop({ type: String, ref: 'Company' }) company: Company | String | null;
  @Prop({ type: String, ref: 'Department' }) department:
    | Department
    | String
    | null;
  @Prop({ type: String, ref: 'User' }) user: User | String | null;

  createdAt: Date;
}

export const JobSchema = SchemaFactory.createForClass(Job);

JobSchema.plugin(leanVirtuals);

JobSchema.virtual('createdAtDiff').get(function (this: JobDocument) {
  const createdAt = this.createdAt ?? (this as any)?.createdAt;
  if (!createdAt) return null;
  return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
});

JobSchema.index({ company: 1, status: 1 });
JobSchema.index({ company: 1, department: 1 });
JobSchema.index({ status: 1, createdAt: -1 });
JobSchema.set('toJSON', { virtuals: true });
JobSchema.set('toObject', { virtuals: true });
JobSchema.plugin(mongoosePaginate);

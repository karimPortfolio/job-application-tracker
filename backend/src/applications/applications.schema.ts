import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Company } from 'src/companies/company.schema';
import { Job } from 'src/jobs/jobs.schema';
import { User } from 'src/users/user.schema';
import mongoosePaginate from 'mongoose-paginate-v2';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import leanVirtuals from 'mongoose-lean-virtuals';

export type ApplicationDocument = HydratedDocument<Application>;

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
export class Application {
  @Prop()
  fullName: string;
  @Prop()
  email: string;
  @Prop()
  phoneNumber: string;

  @Prop()
  linkedInUrl?: string;
  @Prop()
  githubUrl?: string;
  @Prop()
  portfolioUrl?: string;

  @Prop()
  resumeUrl: string;

  @Prop()
  country?: string;
  @Prop()
  city?: string;

  @Prop({ type: String, ref: 'Job' })
  job: string;
  @Prop({ type: String, ref: 'Company' })
  company: string;

  @Prop({
    enum: ['applied', 'in_review', 'interview', 'offer', 'hired', 'rejected'],
    default: 'applied',
  })
  status: string;

  @Prop({
    enum: [
      'screening',
      'technical_interview',
      'hr_interview',
      'final_interview',
      'offer',
    ],
    default: 'screening',
  })
  stage?: string;

  @Prop()
  source?: string;

  @Prop()
  referalName?: string;
  
  @Prop()
  referalEmail?: string;

  @Prop()
  appliedAt: Date;

  @Prop()
  notes?: string;
  @Prop()
  rating?: number;

  @Prop()
  aiScore?: number;
  @Prop()
  aiSummary?: string;

  @Prop({ type: String, ref: 'User' })
  user?: string | User;

  @Prop()
  archivedAt?: Date;

  @Prop()
  viewedAt?: Date;

  @Prop()
  rejectedAt?: Date;

  createdAt: Date;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);

ApplicationSchema.plugin(leanVirtuals);

ApplicationSchema.virtual('createdAtDiff').get(function (this: ApplicationDocument) {
  const createdAt = this.createdAt ?? (this as any)?.createdAt;
  if (!createdAt) return null;
  return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
});


ApplicationSchema.index({ company: 1, job: 1 });
ApplicationSchema.index({ email: 1, job: 1 }, { unique: true });
ApplicationSchema.index({ status: 1, appliedAt: -1 });
ApplicationSchema.plugin(mongoosePaginate);
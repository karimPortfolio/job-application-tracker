import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Job } from "../jobs/jobs.schema";
import { User } from "../users/user.schema";
import { formatDistanceToNow } from "date-fns";
import leanVirtuals from 'mongoose-lean-virtuals';
import mongoosePaginate from 'mongoose-paginate-v2';


export type SavedJobsDocument = HydratedDocument<SavedJobs>;

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
export class SavedJobs {
    @Prop({ type: String, ref: 'User' }) user: User | String;
    @Prop({ type: String, ref: 'Job' }) job: Job | String;
    createdAt: Date;
}

export const SavedJobsSchema = SchemaFactory.createForClass(SavedJobs);

SavedJobsSchema.plugin(leanVirtuals);

SavedJobsSchema.virtual('createdAtDiff').get(function (this: SavedJobsDocument) {
  const createdAt = this.createdAt ?? (this as any)?.createdAt;
  if (!createdAt) return null;
  return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
});

SavedJobsSchema.index({ user: 1, job: 1 });
SavedJobsSchema.index({ user: 1, job: 1 }, { unique: true });
SavedJobsSchema.index({ user: 1 });
SavedJobsSchema.set('toJSON', { virtuals: true });
SavedJobsSchema.set('toObject', { virtuals: true });
SavedJobsSchema.plugin(mongoosePaginate);
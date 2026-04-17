import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { formatDistanceToNow } from 'date-fns';
import { Document, HydratedDocument } from 'mongoose';
import leanVirtuals from 'mongoose-lean-virtuals';
import mongoosePaginate from 'mongoose-paginate-v2';



export type NotificationDocument = HydratedDocument<Notification>;

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
export class Notification {
  @Prop({ type: String, ref: 'User', required: true })
  userId: string;

  @Prop({ required: true })
  type: string;

  @Prop({ type: Object, required: true })
  data: Record<string, any>;

  @Prop({ default: null })
  readAt: Date;

  createdAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

NotificationSchema.virtual('createdAtDiff').get(function (
  this: NotificationDocument,
) {
  if (!this.createdAt) return null;
  return formatDistanceToNow(new Date(this.createdAt), { addSuffix: true });
});

NotificationSchema.set('toJSON', { virtuals: true });
NotificationSchema.set('toObject', { virtuals: true });
NotificationSchema.plugin(leanVirtuals);
NotificationSchema.plugin(mongoosePaginate);

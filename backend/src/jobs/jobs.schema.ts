import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Types } from "mongoose"
import { Company } from "src/companies/company.schema"
import { User } from "src/users/user.schema"

@Schema({ timestamps: true })
export class Job {
  @Prop() title: string
  @Prop() description: string
  @Prop() location: string
  @Prop({ default: true }) isPublished: boolean
  @Prop({ type: Types.ObjectId, ref: 'Company' }) company: Company | Types.ObjectId | null
  @Prop({ type: Types.ObjectId, ref: 'User' }) user: User | Types.ObjectId | null
}

export const JobSchema = SchemaFactory.createForClass(Job)

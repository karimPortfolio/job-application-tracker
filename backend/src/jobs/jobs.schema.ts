import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument, Types } from "mongoose"
import { Company } from "src/companies/company.schema"
import { Department } from "src/departments/departments.schema"
import { User } from "src/users/user.schema"

export type JobDocument = HydratedDocument<Job>

@Schema({ timestamps: true })
export class Job {
  @Prop() title: string
  @Prop() description: string
  @Prop() location: string
  @Prop({ default: true }) isPublished: boolean
  @Prop({ type: String, ref: 'Company' }) company: Company | String | null
  @Prop({ type: String, ref: 'Department' }) department: Department | String | null
  @Prop({ type: String, ref: 'User' }) user: User | String | null
}

export const JobSchema = SchemaFactory.createForClass(Job)
JobSchema.index({ company: 1, department: 1 })

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument, Types } from "mongoose"
import { Company } from "src/companies/company.schema"
import { User } from "src/users/user.schema"

export type DepartmentDocument = HydratedDocument<Department>

@Schema({ timestamps: true })
export class Department {
  @Prop() title: string
  @Prop({ type: String }) description: string
  @Prop({ type: Types.ObjectId, ref: 'Company' }) company: Company | Types.ObjectId 
  @Prop({ type: Types.ObjectId, ref: 'User' }) user: User | Types.ObjectId
}

export const DepartmentSchema = SchemaFactory.createForClass(Department)

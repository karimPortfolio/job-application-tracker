import { Types } from "mongoose"
import { UserDocument } from "src/users/user.schema"

export type DepartmentWithJobsCount = {
  _id: Types.ObjectId
  name: string
  description?: string
  company: string
  user: {
    _id: Types.ObjectId
    name: string
    email?: string
  }
  jobsCount: number
  createdAt: Date
  updatedAt: Date
}


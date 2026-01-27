import { Types } from "mongoose"

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


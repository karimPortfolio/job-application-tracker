export type ValidationErrorItem = {
  field: string
  errors: string[]
}

export interface ApiErrorState {
  status: number | null
  message: string | null
  title: string | null
  validationErrors?: ValidationErrorItem[]
}

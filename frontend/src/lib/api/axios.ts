import axios from 'axios'
import { toast } from 'sonner'

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
  withCredentials: true,
  withXSRFToken: true,
  
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
})

api.interceptors.response.use(
  (response) => {
    const method = response.config?.method?.toLowerCase()
    if (typeof window !== 'undefined' && method && method !== 'get' && method !== 'options') {
      toast.success('Request completed successfully')
    }
    return response
  },
  (error) => {
    const data = error?.response?.data
    const message =
      (data && (data.message || data.error || data.detail || data.title)) ||
      error?.message ||
      'Something went wrong'
    if (typeof window !== 'undefined') {
      toast.error(message)
    }
    return Promise.reject(error)
  }
)

import { create } from 'zustand'

interface User {
  id: number
  name: string
  email: string,
  company?: string,
  membership_type?: string,
  avatar?: string
  email_verified_at?: string
  created_at?: string
}

interface AuthState {
  user: User | null
  initialized: boolean
  setUser: (user: User | null) => void
  setInitialized: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  initialized: false,
  setUser: (user) => set({ user}),
  setInitialized: () => set({ initialized: true }),
}))

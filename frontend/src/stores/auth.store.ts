import { User } from '@/features/auth/types'
import { create } from 'zustand'

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

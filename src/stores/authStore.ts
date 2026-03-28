import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { User } from '@/types'

const SESSION_KEY = 'onda-auth-storage'

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  login: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (user: User) => set({ isAuthenticated: true, user }),
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    { name: SESSION_KEY },
  ),
)

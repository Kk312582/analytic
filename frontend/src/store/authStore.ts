import { create } from 'zustand'

interface AuthState {
  token: string | null
  user: any | null
  setToken: (token: string) => void
  setUser: (user: any) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('forecast_ai_token'),
  user: null,
  setToken: (token) => {
    localStorage.setItem('forecast_ai_token', token)
    set({ token })
  },
  setUser: (user) => set({ user }),
  logout: () => {
    localStorage.removeItem('forecast_ai_token')
    set({ token: null, user: null })
  }
}))

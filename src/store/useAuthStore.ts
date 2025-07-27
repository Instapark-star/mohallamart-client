// src/store/useAuthStore.ts
import { create } from "zustand"

type User = {
  _id: string
  name: string
  phone: string
  token: string
}

type AuthStore = {
  user: User | null
  login: (userData: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,

  login: (userData) => set({ user: userData }),

  logout: () => set({ user: null }),
}))

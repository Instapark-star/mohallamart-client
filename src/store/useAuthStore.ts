// src/store/useAuthStore.ts
import { create } from "zustand"

export type User = {
  _id: string
  name: string
  phone: string
}

type AuthStore = {
  user: User | null
  token: string | null
  login: (user: User, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  login: (user, token) => set({ user, token }),
  logout: () => set({ user: null, token: null }),
}))

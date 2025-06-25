import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../models/model';
// 예진
interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

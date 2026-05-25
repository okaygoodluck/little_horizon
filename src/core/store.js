import { create } from 'zustand';

export const useAppStore = create((set) => ({
  user: null,
  childProfile: null,
  setUser: (user) => set({ user }),
  setChildProfile: (profile) => set({ childProfile: profile }),
  logout: () => set({ user: null, childProfile: null }),
}));

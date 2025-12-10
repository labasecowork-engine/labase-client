import { create } from "zustand";
import type { User } from "@/types/user";

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  deleteUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  deleteUser: () => set({ user: null }),
}));

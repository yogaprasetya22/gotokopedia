// store/index.ts
import { create } from "zustand";

interface CurrentCookieStore {
    defaultOpen: boolean;
    setDefaultOpen: (value: boolean) => void;
}

export const useCurrentCookieStore = create<CurrentCookieStore>((set) => ({
    defaultOpen: false,
    setDefaultOpen: (value) => set({ defaultOpen: value }),
}));

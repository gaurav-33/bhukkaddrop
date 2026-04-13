import { create } from 'zustand';

interface CartState {
  vegOnly: boolean;
  cartItemCount: number;
  notificationsEnabled: boolean;

  toggleVegOnly: () => void;
  setVegOnly: (value: boolean) => void;
  setCartItemCount: (count: number) => void;
  toggleNotifications: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  vegOnly: false,
  cartItemCount: 0,
  notificationsEnabled: true,

  toggleVegOnly: () => set((s) => ({ vegOnly: !s.vegOnly })),
  setVegOnly: (value) => set({ vegOnly: value }),
  setCartItemCount: (count) => set({ cartItemCount: count }),
  toggleNotifications: () => set((s) => ({ notificationsEnabled: !s.notificationsEnabled })),
}));

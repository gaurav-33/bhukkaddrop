import { create } from 'zustand';

interface AuthState {
  userId: string | null;
  displayName: string | null;
  email: string | null;
  phone: string | null;
  avatarUrl: string | null;
  syncFromClerk: (user: {
    id: string;
    fullName: string | null;
    firstName: string | null;
    primaryEmailAddress: { emailAddress: string } | null;
    primaryPhoneNumber: { phoneNumber: string } | null;
    imageUrl: string;
  }) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  displayName: null,
  email: null,
  phone: null,
  avatarUrl: null,

  syncFromClerk: (user) =>
    set({
      userId: user.id,
      displayName: user.fullName || user.firstName || 'Bhukkad User',
      email: user.primaryEmailAddress?.emailAddress ?? null,
      phone: user.primaryPhoneNumber?.phoneNumber ?? null,
      avatarUrl: user.imageUrl ?? null,
    }),

  clear: () =>
    set({
      userId: null,
      displayName: null,
      email: null,
      phone: null,
      avatarUrl: null,
    }),
}));

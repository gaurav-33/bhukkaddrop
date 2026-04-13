import { tokenCache } from '@clerk/expo/token-cache';

export const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    'Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY — add it to your .env file'
  );
}

export { tokenCache };

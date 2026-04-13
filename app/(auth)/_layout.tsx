import { useAuth } from '@clerk/expo';
import { Redirect, Stack } from 'expo-router';

export default function AuthRoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  console.log('[AuthLayout] isLoaded:', isLoaded, 'isSignedIn:', isSignedIn);

  // When we arrive here from (home)/_layout.tsx, isLoaded is already true,
  // so this null branch is never actually seen by the user.
  if (!isLoaded) return null;

  if (isSignedIn) {
    console.log('[AuthLayout] Redirecting to /');
    return <Redirect href="/" />;
  }

  console.log('[AuthLayout] Rendering Stack');
  return <Stack screenOptions={{ headerShown: false }} initialRouteName="sign-in" />;
}

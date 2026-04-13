import { useAuth } from '@clerk/expo';
import { Redirect, Stack } from 'expo-router';

export default function HomeLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  console.log('[HomeLayout] isLoaded:', isLoaded, 'isSignedIn:', isSignedIn);

  // null → Expo Router queues the navigation properly
  // (a View here causes Stack to lose its initial route when the layout switches)
  if (!isLoaded) return null;

  if (!isSignedIn) {
    console.log('[HomeLayout] Redirecting to /(auth)/sign-in');
    return <Redirect href="/(auth)/sign-in" />;
  }

  console.log('[HomeLayout] Rendering Stack');
  return <Stack screenOptions={{ headerShown: false }} />;
}

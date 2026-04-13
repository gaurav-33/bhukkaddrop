import '@/global.css';
import { ClerkProvider, useAuth } from '@clerk/expo';
import { publishableKey, tokenCache } from '@/lib/clerk';
import { useFonts } from 'expo-font';
import { SplashScreen, Slot, useSegments } from 'expo-router';
import { useEffect } from 'react';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Separated into an inner component so it can call useAuth(),
// which only works inside <ClerkProvider>.
function RootLayoutInner() {
  const { isLoaded: clerkLoaded } = useAuth();
  const segments = useSegments();

  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
    'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
    'Inter-Light': require('../assets/fonts/Inter-Light.ttf'),

    'Epilogue-Bold': require('../assets/fonts/Epilogue-Bold.ttf'),
    'Epilogue-SemiBold': require('../assets/fonts/Epilogue-SemiBold.ttf'),
    'Epilogue-Regular': require('../assets/fonts/Epilogue-Regular.ttf'),
  });

  // Keep the splash screen up until BOTH fonts and Clerk have finished loading.
  // This ensures the group layouts' `return null` branches are never visible to
  // the user — the splash covers them until navigation is ready.
  useEffect(() => {
    console.log('[Root] fontsLoaded:', fontsLoaded, 'clerkLoaded:', clerkLoaded);
    if (fontsLoaded && clerkLoaded) {
      console.log('[Root] Hiding splash screen');
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, clerkLoaded]);

  if (!fontsLoaded || !clerkLoaded) {
    console.log('[Root] Not rendering Slot yet');
    return null;
  }

  console.log('[Root] Rendering root Slot. Current segments:', segments);
  return <Slot />;
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <RootLayoutInner />
    </ClerkProvider>
  );
}

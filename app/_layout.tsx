import '@/global.css';
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from 'react';

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
    'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
    'Inter-Light': require('../assets/fonts/Inter-Light.ttf'),

    'Epilogue-Bold': require("../assets/fonts/Epilogue-Bold.ttf"),
    'Epilogue-SemiBold': require("../assets/fonts/Epilogue-SemiBold.ttf"),
    'Epilogue-Regular': require("../assets/fonts/Epilogue-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded])

  if (!fontsLoaded) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}

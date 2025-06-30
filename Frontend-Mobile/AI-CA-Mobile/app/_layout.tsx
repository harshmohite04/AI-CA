import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { configureLogger } from 'react-native-reanimated';
// import '../global.css';

if (typeof configureLogger === 'function') {
  configureLogger({
    warn: (message: string) => {
      if (
        message.includes("Writing to `value` during component render")
      ) {
        return;
      }
      console.warn(message);
    },
  });
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="LoginPage" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="OTPVerification" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}

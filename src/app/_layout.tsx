import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Toaster } from 'sonner-native';

import '../global.css';
import { House, ShoppingCart } from '@/lib/icons';
import { useAppStore } from '@/store';
import { useColorScheme } from '@/hooks';
import { Platform } from 'react-native';
import { ThemeProvider } from '@react-navigation/native';
import { DARK_THEME, LIGHT_THEME } from '@/lib/constants';
import { ThemeToggle } from '@/components/ui';

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined'
    ? useEffect
    : useLayoutEffect;

export default function RootLayout() {
  const mounted = useRef(false);
  const { colorScheme } = useColorScheme();
  const [colorSchemeLoaded, setColorSchemeLoaded] = useState(false);
  const { cart } = useAppStore();
  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  useIsomorphicLayoutEffect(() => {
    if (mounted.current) {
      return;
    }
    if (Platform.OS === 'web') {
      document.documentElement.classList.add('bg-background');
    }
    setColorSchemeLoaded(true);
    mounted.current = true;
  }, []);

  if (!colorSchemeLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <SafeAreaProvider>
        <GestureHandlerRootView>
          <Tabs
            initialRouteName='(tabs)/(stack)'
            screenOptions={{
              headerRight: () => <ThemeToggle />,
            }}
          >
            <Tabs.Screen
              name='(tabs)/(stack)'
              options={{
                headerShown: false,
                title: 'Home',
                tabBarIcon: ({ color, size }) => (
                  <House
                    size={size}
                    color={color}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name='(tabs)/shopping-cart'
              options={{
                title: 'Shopping Cart',
                tabBarBadge: cartCount,
                tabBarBadgeStyle: {},
                tabBarIcon: ({ color, size }) => (
                  <ShoppingCart
                    size={size}
                    color={color}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name='+not-found'
              options={{ href: null }}
            />
          </Tabs>
          <Toaster
            position='top-center'
            duration={2000}
            closeButton
          />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

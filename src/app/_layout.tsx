import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import '../global.css';
import { House, ShoppingCart } from '@/lib/icons';
import { useAppStore } from '@/store';

export default function RootLayout() {
  const { cart } = useAppStore();
  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  return (
    <>
      <Tabs>
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
      <StatusBar />
    </>
  );
}

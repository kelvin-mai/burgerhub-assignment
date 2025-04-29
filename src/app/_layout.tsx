import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import '../global.css';
import { House, ShoppingCart } from '@/lib/icons';

export default function RootLayout() {
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
            tabBarBadge: 2,
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

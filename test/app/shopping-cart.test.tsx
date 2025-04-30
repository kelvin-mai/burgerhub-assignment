import * as React from 'react';
import { act, render, renderHook, screen } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ShoppingCartScreen from '@/app/(tabs)/shopping-cart';
import { formatUSD } from '@/lib/utils';
import { useAppStore } from '@/store';
import { mockProduct, mockProduct2 } from '../fixtures';

describe('<ShoppingCartScreen />', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useAppStore());
    act(() => result.current.actions.reset());
  });

  it('should render no items in cart text', () => {
    render(
      <NavigationContainer>
        <SafeAreaProvider
          initialMetrics={{
            frame: { x: 0, y: 0, width: 0, height: 0 },
            insets: { top: 0, left: 0, right: 0, bottom: 0 },
          }}
        >
          <ShoppingCartScreen />
        </SafeAreaProvider>
      </NavigationContainer>,
    );
    expect(
      screen.getByTestId('shopping-cart-screen-no-cart-text').props.children,
    ).toBeTruthy();
  });

  it('should render single item in cart', () => {
    const { result } = renderHook(() => useAppStore());
    act(() => result.current.actions.addToCart(mockProduct));
    render(
      <NavigationContainer>
        <SafeAreaProvider
          initialMetrics={{
            frame: { x: 0, y: 0, width: 0, height: 0 },
            insets: { top: 0, left: 0, right: 0, bottom: 0 },
          }}
        >
          <ShoppingCartScreen />
        </SafeAreaProvider>
      </NavigationContainer>,
    );
    expect(screen.getByTestId('shopping-cart-screen-list')).toBeTruthy();
    expect(screen.getAllByTestId('product-cart-item-name')).toHaveLength(1);
    expect(
      screen.getByTestId('shopping-cart-screen-total').props.children,
    ).toEqual(['Total: ', formatUSD(mockProduct.price)]);
    expect(
      screen.getByTestId('shopping-cart-screen-clear-cart-button'),
    ).toBeTruthy();
  });

  it('should render multiple items in cart', () => {
    const { result } = renderHook(() => useAppStore());
    act(() => result.current.actions.addToCart(mockProduct));
    act(() => result.current.actions.addToCart(mockProduct));
    act(() => result.current.actions.addToCart(mockProduct2));
    const total = mockProduct.price * 2 + mockProduct2.price;
    render(
      <NavigationContainer>
        <SafeAreaProvider
          initialMetrics={{
            frame: { x: 0, y: 0, width: 0, height: 0 },
            insets: { top: 0, left: 0, right: 0, bottom: 0 },
          }}
        >
          <ShoppingCartScreen />
        </SafeAreaProvider>
      </NavigationContainer>,
    );
    expect(screen.getByTestId('shopping-cart-screen-list')).toBeTruthy();
    expect(screen.getAllByTestId('product-cart-item-name')).toHaveLength(2);
    expect(
      screen.getByTestId('shopping-cart-screen-total').props.children,
    ).toEqual(['Total: ', formatUSD(total)]);
    expect(
      screen.getByTestId('shopping-cart-screen-clear-cart-button'),
    ).toBeTruthy();
  });
});

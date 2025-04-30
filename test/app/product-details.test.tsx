import * as React from 'react';
import { act, render, renderHook, screen } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ProductDetailScreen from '@/app/(tabs)/(stack)/product-details';
import { formatUSD } from '@/lib/utils';
import { useAppStore } from '@/store';
import { mockProduct } from '../fixtures';

jest.mock('expo-router', () => ({
  Stack: {
    Screen: ({ children }: React.PropsWithChildren) => <>{children}</>,
  },
}));

describe('<ProductDetailScreen />', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useAppStore());
    act(() => result.current.actions.reset());
  });

  it('should render selected product', () => {
    const { result } = renderHook(() => useAppStore());
    act(() => result.current.actions.setSelectedProduct(mockProduct));
    render(
      <NavigationContainer>
        <SafeAreaProvider
          initialMetrics={{
            frame: { x: 0, y: 0, width: 0, height: 0 },
            insets: { top: 0, left: 0, right: 0, bottom: 0 },
          }}
        >
          <ProductDetailScreen />
        </SafeAreaProvider>
      </NavigationContainer>,
    );
    expect(
      screen.getByTestId('product-details-screen-name').props.children,
    ).toEqual(mockProduct.name);
    expect(
      screen.getByTestId('product-details-screen-calories').props.children,
    ).toEqual(['Calories: ', mockProduct.calorie]);
    expect(
      screen.getByTestId('product-details-screen-description').props.children,
    ).toEqual(mockProduct.description);
    expect(
      screen.getByTestId('product-details-screen-image').props.source.uri,
    ).toEqual(mockProduct.image);
    expect(
      screen.getByTestId('product-details-screen-price').props.children,
    ).toEqual(formatUSD(mockProduct.price));
  });
});

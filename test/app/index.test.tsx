import * as React from 'react';
import { act, render, renderHook, screen } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from '@/app/(tabs)/(stack)';
import { useAppStore } from '@/store';
import { mockProduct, mockProduct2 } from '../fixtures';

jest.mock('expo-router', () => ({
  useRouter: () => ({
    navigate: jest.fn(),
  }),
  Stack: {
    Screen: ({ children }: React.PropsWithChildren) => <>{children}</>,
  },
}));

jest.mock('@/store', () => ({
  ...jest.requireActual('@/store'),
  useAppEffects: () => ({
    loadProducts: jest.fn(),
  }),
}));

describe('<HomeScreen />', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useAppStore());
    act(() => result.current.actions.reset());
  });

  it('should render activity indicator when loading', () => {
    const { result } = renderHook(() => useAppStore());
    act(() => result.current.actions.setLoading(true));
    render(
      <NavigationContainer>
        <SafeAreaProvider
          initialMetrics={{
            frame: { x: 0, y: 0, width: 0, height: 0 },
            insets: { top: 0, left: 0, right: 0, bottom: 0 },
          }}
        >
          <HomeScreen />
        </SafeAreaProvider>
      </NavigationContainer>,
    );
    expect(screen.getByTestId('home-loading-indicator')).toBeTruthy();
  });

  it('should render text when no products', () => {
    const { result } = renderHook(() => useAppStore());
    act(() => result.current.actions.setLoading(false));
    render(
      <NavigationContainer>
        <SafeAreaProvider
          initialMetrics={{
            frame: { x: 0, y: 0, width: 0, height: 0 },
            insets: { top: 0, left: 0, right: 0, bottom: 0 },
          }}
        >
          <HomeScreen />
        </SafeAreaProvider>
      </NavigationContainer>,
    );
    expect(screen.getByTestId('home-no-products-text')).toBeTruthy();
  });

  it('should render products', () => {
    const { result } = renderHook(() => useAppStore());
    act(() => result.current.actions.setProducts([mockProduct, mockProduct2]));
    act(() => result.current.actions.setLoading(false));
    render(
      <NavigationContainer>
        <SafeAreaProvider
          initialMetrics={{
            frame: { x: 0, y: 0, width: 0, height: 0 },
            insets: { top: 0, left: 0, right: 0, bottom: 0 },
          }}
        >
          <HomeScreen />
        </SafeAreaProvider>
      </NavigationContainer>,
    );
    expect(screen.getByTestId('home-products-list')).toBeTruthy();
    expect(screen.getAllByTestId('product-list-item-name')).toHaveLength(2);
  });
});

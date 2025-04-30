import { act, renderHook } from '@testing-library/react-native';

import { useAppStore } from '@/store';
import { mockProduct, mockProduct2 } from '../fixtures';

describe('useAppStore - actions', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useAppStore());
    act(() => result.current.actions.reset());
  });

  it('should have initial state', () => {
    const { result } = renderHook(() => useAppStore());
    expect(result.current.loading).toBeFalsy();
    expect(result.current.loading).toBeDefined();
    expect(result.current.products).toHaveLength(0);
    expect(result.current.selected).toBeDefined();
    expect(result.current.selected).toBeNull();
  });

  it('should set selected product', () => {
    const { result } = renderHook(() => useAppStore());
    act(() => result.current.actions.setSelectedProduct(mockProduct));
    expect(result.current.selected).toBe(mockProduct);
  });

  it('should add product to cart', () => {
    const { result } = renderHook(() => useAppStore());
    act(() => result.current.actions.addToCart(mockProduct));
    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].product).toBe(mockProduct);
    expect(result.current.cart[0].quantity).toBe(1);
  });

  it('should add multiple same product to cart', () => {
    const { result } = renderHook(() => useAppStore());
    act(() => result.current.actions.addToCart(mockProduct));
    act(() => result.current.actions.addToCart(mockProduct));
    act(() => result.current.actions.addToCart(mockProduct));
    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].product).toBe(mockProduct);
    expect(result.current.cart[0].quantity).toBe(3);
  });

  it('should add different products to cart', () => {
    const { result } = renderHook(() => useAppStore());
    act(() => result.current.actions.addToCart(mockProduct));
    act(() => result.current.actions.addToCart(mockProduct2));
    expect(result.current.cart).toHaveLength(2);
    expect(result.current.cart).toEqual(
      expect.arrayContaining([{ product: mockProduct, quantity: 1 }]),
    );
    expect(result.current.cart).toEqual(
      expect.arrayContaining([{ product: mockProduct2, quantity: 1 }]),
    );
  });

  it('should subtract products from cart', () => {
    const { result } = renderHook(() => useAppStore());
    act(() => result.current.actions.addToCart(mockProduct));
    act(() => result.current.actions.addToCart(mockProduct));
    act(() => result.current.actions.subtractFromCart(mockProduct));
    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].product).toBe(mockProduct);
    expect(result.current.cart[0].quantity).toBe(1);
  });

  it('should clear cart', () => {
    const { result } = renderHook(() => useAppStore());
    act(() => result.current.actions.addToCart(mockProduct));
    act(() => result.current.actions.addToCart(mockProduct));
    act(() => result.current.actions.addToCart(mockProduct2));
    act(() => result.current.actions.clearCart());
    expect(result.current.cart).toHaveLength(0);
  });
});

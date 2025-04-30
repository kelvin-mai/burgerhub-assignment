import { toast } from 'sonner-native';

import { API_URL } from '@/lib/constants';
import type { APIProduct } from '@/lib/types';
import type { AppEffects, Setter, Getter } from './types';

const loadProducts =
  (get: Getter): AppEffects['loadProducts'] =>
  async () => {
    const {
      actions: { setLoading, setProducts },
    } = get();
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const { products }: { products: APIProduct[] } = await res.json();
      setProducts(products);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

const addToCart =
  (get: Getter): AppEffects['addToCart'] =>
  (product) => {
    const {
      actions: { addToCart },
    } = get();
    addToCart(product);
    toast.success('Success', {
      description: `${product.name} has successfully been added to cart.`,
    });
  };

const subtractFromCart =
  (get: Getter): AppEffects['subtractFromCart'] =>
  (product) => {
    const {
      actions: { subtractFromCart },
    } = get();
    subtractFromCart(product);
    toast.success('Success', {
      description: `${product.name} has successfully been subtracted from cart.`,
    });
  };

const removeFromCart =
  (get: Getter): AppEffects['removeFromCart'] =>
  (product) => {
    const {
      actions: { removeFromCart },
    } = get();
    removeFromCart(product);
    toast.success('Success', {
      description: `${product.name} has successfully been removed from cart.`,
    });
  };

const clearCart =
  (get: Getter): AppEffects['clearCart'] =>
  () => {
    const {
      cart,
      actions: { clearCart },
    } = get();
    if (cart.length > 0) {
      clearCart();
      toast.success('Success', {
        description: 'Cart has successfully been cleared.',
      });
    }
  };

export const createEffects = (_: Setter, get: Getter): AppEffects => ({
  loadProducts: loadProducts(get),
  addToCart: addToCart(get),
  subtractFromCart: subtractFromCart(get),
  removeFromCart: removeFromCart(get),
  clearCart: clearCart(get),
});

import { initialState } from './state';
import type { AppActions, Setter } from './types';

const reset =
  (set: Setter): AppActions['reset'] =>
  () =>
    set(initialState);

const setLoading =
  (set: Setter): AppActions['setLoading'] =>
  (loading) =>
    set({ loading });

const setProducts =
  (set: Setter): AppActions['setProducts'] =>
  (products) =>
    set({ products });

const setSelectedProduct =
  (set: Setter): AppActions['setSelectedProduct'] =>
  (product) =>
    set({ selected: product });

const addToCart =
  (set: Setter): AppActions['addToCart'] =>
  (product) =>
    set((state) => ({
      ...state,
      cart: state.cart.find((c) => c.product.id === product.id)
        ? state.cart.map((c) =>
            c.product.id === product.id
              ? { ...c, quantity: c.quantity + 1 }
              : c,
          )
        : [...state.cart, { product, quantity: 1 }],
    }));

const subtractFromCart =
  (set: Setter): AppActions['subtractFromCart'] =>
  (product) =>
    set((state) => ({
      ...state,
      cart: state.cart.find(
        (c) => c.product.id === product.id && c.quantity <= 1,
      )
        ? state.cart.filter((c) => c.product.id !== product.id)
        : state.cart.map((c) =>
            c.product.id === product.id
              ? { ...c, quantity: c.quantity - 1 }
              : c,
          ),
    }));

const removeFromCart =
  (set: Setter): AppActions['removeFromCart'] =>
  (product) =>
    set((state) => ({
      ...state,
      cart: state.cart.filter((c) => c.product.id !== product.id),
    }));

const clearCart =
  (set: Setter): AppActions['clearCart'] =>
  () =>
    set({ cart: [] });

export const createActions = (set: Setter): AppActions => ({
  reset: reset(set),
  setLoading: setLoading(set),
  setProducts: setProducts(set),
  setSelectedProduct: setSelectedProduct(set),
  addToCart: addToCart(set),
  subtractFromCart: subtractFromCart(set),
  removeFromCart: removeFromCart(set),
  clearCart: clearCart(set),
});

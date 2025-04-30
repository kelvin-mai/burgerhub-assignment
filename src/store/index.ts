import { create } from 'zustand';
import { toast } from 'sonner-native';

import { API_URL } from '@/lib/constants';
import type { APIProduct, CartItem } from '@/lib/types';

export type AppState = {
  loading: boolean;
  products: APIProduct[];
  selected: APIProduct | null;
  cart: CartItem[];
};

const initialState: AppState = {
  loading: false,
  products: [],
  selected: null,
  cart: [],
};

type AppActions = {
  reset(): void;
  setLoading(loading: boolean): void;
  setProducts(products: APIProduct[]): void;
  setSelectedProduct(product: APIProduct): void;
  addToCart(product: APIProduct): void;
  subtractFromCart(product: APIProduct): void;
  removeFromCart(product: APIProduct): void;
  clearCart(): void;
};

type AppEffects = {
  loadProducts(): Promise<void>;
  addToCart(product: APIProduct): void;
  subtractFromCart(product: APIProduct): void;
  removeFromCart(product: APIProduct): void;
  clearCart(): void;
};

type AppStore = AppState & {
  actions: AppActions;
  effects: AppEffects;
};

export const useAppStore = create<AppStore>((set, get) => ({
  ...initialState,
  actions: {
    reset: () => {
      set(initialState);
    },
    setLoading: (loading) => set({ loading }),
    setProducts: (products) => set({ products }),
    setSelectedProduct: (product) => set({ selected: product }),
    addToCart: (product) =>
      set((state) => ({
        ...state,
        cart: state.cart.find((c) => c.product.id === product.id)
          ? state.cart.map((c) =>
              c.product.id === product.id
                ? { ...c, quantity: c.quantity + 1 }
                : c,
            )
          : [...state.cart, { product, quantity: 1 }],
      })),
    subtractFromCart: (product) =>
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
      })),
    removeFromCart: (product) =>
      set((state) => ({
        ...state,
        cart: state.cart.filter((c) => c.product.id !== product.id),
      })),
    clearCart: () => set({ cart: [] }),
  },
  effects: {
    loadProducts: async () => {
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
    },
    addToCart: (product) => {
      const {
        actions: { addToCart },
      } = get();
      addToCart(product);
      toast.success('Success', {
        description: `${product.name} has successfully been added to cart.`,
      });
    },
    subtractFromCart: (product) => {
      const {
        actions: { subtractFromCart },
      } = get();
      subtractFromCart(product);
      toast.success('Success', {
        description: `${product.name} has successfully been subtracted from cart.`,
      });
    },
    removeFromCart: (product) => {
      const {
        actions: { removeFromCart },
      } = get();
      removeFromCart(product);
      toast.success('Success', {
        description: `${product.name} has successfully been removed from cart.`,
      });
    },
    clearCart: () => {
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
    },
  },
}));

export const useAppActions = () => useAppStore((store) => store.actions);
export const useAppEffects = () => useAppStore((store) => store.effects);

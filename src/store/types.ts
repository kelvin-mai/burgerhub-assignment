import { APIProduct, CartItem } from '@/lib/types';

export type AppState = {
  loading: boolean;
  products: APIProduct[];
  selected: APIProduct | null;
  cart: CartItem[];
};

export type AppActions = {
  reset(): void;
  setLoading(loading: boolean): void;
  setProducts(products: APIProduct[]): void;
  setSelectedProduct(product: APIProduct): void;
  addToCart(product: APIProduct): void;
  subtractFromCart(product: APIProduct): void;
  removeFromCart(product: APIProduct): void;
  clearCart(): void;
};

export type AppEffects = {
  loadProducts(): Promise<void>;
  addToCart(product: APIProduct): void;
  subtractFromCart(product: APIProduct): void;
  removeFromCart(product: APIProduct): void;
  clearCart(): void;
};

export type AppStore = AppState & {
  actions: AppActions;
  effects: AppEffects;
};

export type Setter = (
  partial:
    | AppState
    | Partial<AppState>
    | ((state: AppState) => AppState | Partial<AppState>),
  replace?: false,
) => void;

export type Getter = () => AppStore;

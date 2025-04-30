import type { AppState } from './types';

export const initialState: AppState = {
  loading: false,
  products: [],
  selected: null,
  cart: [],
};

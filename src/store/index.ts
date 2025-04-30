import { create } from 'zustand';

import type { AppStore } from './types';
import { initialState } from './state';
import { createActions } from './actions';
import { createEffects } from './effects';

export const useAppStore = create<AppStore>((set, get, _) => ({
  ...initialState,
  actions: createActions(set),
  effects: createEffects(set, get),
}));

export const useAppActions = () => useAppStore((store) => store.actions);
export const useAppEffects = () => useAppStore((store) => store.effects);

import { Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { NAV_THEME } from './constants';

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args));
};

export const formatUSD = (price: number = 0) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price / 100);

export const setAndroidNavigationBar = async (theme: 'light' | 'dark') => {
  if (Platform.OS !== 'android') return;
  await NavigationBar.setButtonStyleAsync(theme === 'dark' ? 'light' : 'dark');
  await NavigationBar.setBackgroundColorAsync(
    theme === 'dark' ? NAV_THEME.dark.background : NAV_THEME.light.background,
  );
};

import { type Theme, DefaultTheme, DarkTheme } from '@react-navigation/native';

export const API_URL = 'https://burgerhub00.github.io/data/products.json';

export const NAV_THEME = {
  light: {
    background: '#f4f4f5', // zinc-100
    border: '#a1a1aa', // zinc-400
    card: 'white',
    notification: '#f43f5e', // rose-500
    primary: '#8b5cf6', // violet-500
    text: '#0a0a0a', // zinc-950
  },
  dark: {
    background: '#0a0a0a', // zinc-950
    border: '#52525b', // zinc-600
    card: '#18181b', // zinc-900
    notification: '#e11d48', // rose-600
    primary: '#8b5cf6', // violet-500
    text: '#f1f5f9', // zinc-100
  },
};

export const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};

export const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

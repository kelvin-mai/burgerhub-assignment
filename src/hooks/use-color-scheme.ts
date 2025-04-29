import { useColorScheme as useNativewindColorScheme } from 'nativewind';

export const useColorScheme = () => {
  const { colorScheme, setColorScheme, toggleColorScheme } =
    useNativewindColorScheme();
  return {
    colorScheme: colorScheme ?? 'dark',
    setColorScheme,
    toggleColorScheme,
  };
};

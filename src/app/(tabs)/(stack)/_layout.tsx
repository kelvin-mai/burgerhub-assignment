import { ThemeToggle } from '@/components/ui';
import { Stack } from 'expo-router';

export default function ProductLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={() => ({
          headerRight: () => <ThemeToggle />,
        })}
      />
      <Stack.Screen name='product-details' />
    </Stack>
  );
}

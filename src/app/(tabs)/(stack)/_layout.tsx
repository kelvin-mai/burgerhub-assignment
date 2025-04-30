import { Stack } from 'expo-router';

import { ThemeToggle } from '@/components/ui';

export default function ProductLayout() {
  return <Stack screenOptions={{ headerRight: () => <ThemeToggle /> }} />;
}

import { ThemeToggle } from '@/components/ui';
import { Stack } from 'expo-router';

export default function ProductLayout() {
  return <Stack screenOptions={{ headerRight: () => <ThemeToggle /> }} />;
}

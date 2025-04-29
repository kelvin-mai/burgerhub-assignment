import { Image } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { toast } from 'sonner-native';

import { Button, Text } from '@/components/ui';
import { useAppActions, useAppStore } from '@/store';
import { formatUSD } from '@/lib/utils';

export default function ProductDetailScreen() {
  const { selected } = useAppStore();
  const { addToCart } = useAppActions();

  if (!selected) {
    return <Redirect href='/' />;
  }

  const handlePress = () => {
    addToCart(selected);
    toast.success('Success', {
      description: `${selected.name} has successfully been added to cart`,
    });
  };

  return (
    <SafeAreaView className='flex items-center justify-center min-h-full space-y-2 mx-4'>
      <Stack.Screen options={{ title: selected.name }} />
      <Image
        source={{ uri: selected.image }}
        className='rounded-lg'
        style={{ width: 200, height: 200 }}
      />
      <Text className='font-bold text-2xl'>{selected.name}</Text>
      <Text className='text-xl text-slate-700'>
        Calories: {selected.calorie}
      </Text>
      <Text className='text-center text-slate-700'>{selected.description}</Text>
      <Text className='text-xl font-bold'>{formatUSD(selected.price)}</Text>
      <Button
        className='rounded-lg bg-blue-500 px-4 py-2 text-white w-full font-bold'
        onPress={handlePress}
      >
        Add to cart
      </Button>
    </SafeAreaView>
  );
}

import { Image, Text, Pressable } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { toast } from 'sonner-native';

import { useAppActions, useAppStore } from '@/store';
import { formatUSD } from '@/lib/utils';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <SafeAreaView className='flex items-center justify-center'>
      <Stack.Screen options={{ title: selected.name }} />
      <Image
        source={{ uri: selected.image }}
        className='rounded-lg'
        style={{ width: 200, height: 200 }}
      />
      <Text>{selected.name}</Text>
      <Text>{selected.calorie}</Text>
      <Text className='text-center'>{selected.description}</Text>
      <Text>{formatUSD(selected.price)}</Text>
      <Pressable
        className='rounded-lg bg-blue-500 px-4 py-2'
        onPress={handlePress}
      >
        <Text className='text-white'>Add to cart</Text>
      </Pressable>
    </SafeAreaView>
  );
}

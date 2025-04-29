import { View, Image, Text, Pressable } from 'react-native';
import { Redirect, Stack } from 'expo-router';

import { useAppActions, useAppStore } from '@/store';
import { formatUSD } from '@/lib/utils';

export default function ProductDetailScreen() {
  const { selected } = useAppStore();
  const { addToCart } = useAppActions();

  if (!selected) {
    return <Redirect href='/+not-found' />;
  }

  const handlePress = () => {
    addToCart(selected);
  };

  return (
    <View className='flex items-center justify-center'>
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
    </View>
  );
}

import { View, Image, Text, Pressable } from 'react-native';
import { Stack } from 'expo-router';

import { APIProduct } from '@/lib/types';

export default function ProductDetailScreen() {
  const item: APIProduct = {
    calorie: 640,
    description:
      'Featuring a unique black bun, this burger comes with a juicy Angus beef patty, melted cheddar, and caramelized onions.',
    id: '2',
    image: 'https://images.unsplash.com/photo-1582196016295-f8c8bd4b3a99',
    name: 'Black Burger',
    price: 599,
    slug: 'black-burger',
  };
  return (
    <View className='flex items-center justify-center'>
      <Stack.Screen options={{ title: 'Product Details' }} />
      <Image
        source={{ uri: item.image }}
        className='rounded-lg'
        style={{ width: 200, height: 200 }}
      />
      <Text>{item.name}</Text>
      <Text>{item.calorie}</Text>
      <Text className='text-center'>{item.description}</Text>
      <Text>{item.price}</Text>
      <Pressable
        className='rounded-lg bg-blue-500 px-4 py-2'
        onPress={console.log}
      >
        <Text className='text-white'>Add to cart</Text>
      </Pressable>
    </View>
  );
}

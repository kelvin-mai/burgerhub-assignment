import { ScrollView, FlatList, Text, Pressable } from 'react-native';

import { useAppEffects, useAppStore } from '@/store';
import { ProductCartItem } from '@/components/product';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ShoppingCartScreen() {
  const { cart } = useAppStore();
  const { clearCart } = useAppEffects();
  const total = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  return (
    <SafeAreaView>
      <ScrollView className='min-h-screen p-4'>
        <FlatList
          data={cart}
          renderItem={({ item }) => (
            <ProductCartItem
              key={item.product.id}
              product={item.product}
              quantity={item.quantity}
            />
          )}
        />
        <Text className='text-center my-2'>{total}</Text>
        <Pressable
          className='rounded-lg bg-slate-500 px-4 py-2'
          onPress={clearCart}
        >
          <Text className='text-white text-center'>Clear Cart</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

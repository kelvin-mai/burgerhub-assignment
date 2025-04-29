import { View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text, Button } from '@/components/ui';
import { useAppEffects, useAppStore } from '@/store';
import { ProductCartItem } from '@/components/product';
import { formatUSD } from '@/lib/utils';

export default function ShoppingCartScreen() {
  const { cart } = useAppStore();
  const { clearCart } = useAppEffects();
  const total = cart.reduce((acc, curr) => acc + curr.product.price, 0);
  return (
    <SafeAreaView className='px-4'>
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
      <Text className='text-center text-xl my-2 font-bold'>
        Total: {formatUSD(total)}
      </Text>
      <Button
        className='rounded-lg bg-slate-500 px-4 py-2 font-bold'
        onPress={clearCart}
      >
        <Text className='text-white font-bold'>Clear Cart</Text>
      </Button>
    </SafeAreaView>
  );
}

import { View, SectionList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text, Button } from '@/components/ui';
import { useAppEffects, useAppStore } from '@/store';
import { ProductCartItem } from '@/components/product';
import { formatUSD } from '@/lib/utils';

export default function ShoppingCartScreen() {
  const { cart } = useAppStore();
  const { clearCart } = useAppEffects();
  const total = cart.reduce(
    (acc, curr) => acc + curr.product.price * curr.quantity,
    0,
  );
  return (
    <SafeAreaView edges={['bottom']}>
      <View className='px-2 pt-2'>
        {cart.length > 0 ? (
          <SectionList
            sections={[{ data: cart }]}
            testID='shopping-cart-screen-list'
            renderItem={({ item }) => (
              <ProductCartItem
                key={item.product.id}
                product={item.product}
                quantity={item.quantity}
              />
            )}
            renderSectionFooter={() => (
              <View className='py-2 mb-2'>
                <Text
                  className='text-center text-xl my-2 font-bold'
                  testID='shopping-cart-screen-total'
                >
                  Total: {formatUSD(total)}
                </Text>
                <Button
                  onPress={clearCart}
                  className='bg-zinc-600'
                  testID='shopping-cart-screen-clear-cart-button'
                >
                  <Text>Clear Cart</Text>
                </Button>
              </View>
            )}
          />
        ) : (
          <View className='flex items-center justify-center min-h-full'>
            <Text
              className='text-lg text-center'
              testID='shopping-cart-screen-no-cart-text'
            >
              You currently have no items in your cart. Please go back to the
              menu and add some items to continue.
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

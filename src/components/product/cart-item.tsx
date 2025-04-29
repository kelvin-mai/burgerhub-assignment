import { View, Image } from 'react-native';

import type { CartItem } from '@/lib/types';
import { Minus, Plus } from '@/lib/icons';
import { Text, Button } from '@/components/ui';
import { formatUSD } from '@/lib/utils';
import { useAppEffects } from '@/store';

type ProductCartItemProps = CartItem;

export const ProductCartItem: React.FC<ProductCartItemProps> = ({
  product,
  quantity,
}) => {
  const { addToCart, removeFromCart } = useAppEffects();
  const subtotal = product.price * quantity;
  return (
    <View className='p-2 flex border rounded-lg my-2 border-slate-400 drop-shadow-lg bg-white'>
      <View className='flex-row gap-2'>
        <Image
          source={{ uri: product.image }}
          className='rounded-lg'
          style={{ width: 120, height: 120 }}
        />
        <View className='flex-1 justify-between'>
          <View>
            <Text className='font-bold text-lg'>{product.name}</Text>
            <Text className='text-slate-600'>Quantity: {quantity}</Text>
            <Text className='text-slate-600'>
              Price: {formatUSD(product.price)}
            </Text>
          </View>
          <View className='gap-2 flex flex-row mt-2'>
            <Button
              className='bg-blue-500 grow items-center justify-center'
              onPress={() => addToCart(product)}
            >
              <Plus
                color='white'
                size={16}
              />
            </Button>
            <Button
              className='bg-blue-500 grow items-center justify-center'
              onPress={() => removeFromCart(product)}
            >
              <Minus
                color='white'
                size={16}
              />
            </Button>
          </View>
        </View>
      </View>
      <View className='space-y-2'>
        <View className='text-slate-700 text-lg'>
          Subtotal: {formatUSD(subtotal)}
        </View>
        <Button className='rounded-lg bg-red-500 text-white font-bold'>
          Remove
        </Button>
      </View>
    </View>
  );
};

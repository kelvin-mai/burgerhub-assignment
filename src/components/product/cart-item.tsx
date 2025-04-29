import { View, Image, Text, Pressable } from 'react-native';

import type { CartItem } from '@/lib/types';
import { Minus, Plus } from '@/lib/icons';
import { formatUSD } from '@/lib/utils';
import { useAppActions } from '@/store';

type ProductCartItemProps = CartItem;

export const ProductCartItem: React.FC<ProductCartItemProps> = ({
  product,
  quantity,
}) => {
  const { addToCart, removeFromCart } = useAppActions();
  return (
    <View className='p-2 flex flex-row gap-2 border rounded-lg my-2 border-slate-400'>
      <Image
        source={{ uri: product.image }}
        className='rounded-lg'
        style={{ width: 120, height: 120 }}
      />
      <View className='flex-1'>
        <Text className='font-bold text-lg'>{product.name}</Text>
        <Text>Quantity: {quantity}</Text>
        <Text>Price: {formatUSD(product.price)}</Text>
        <View className='gap-2 flex flex-row mt-2'>
          <Pressable
            className='rounded-lg bg-blue-500 px-4 py-2 grow flex items-center justify-center'
            onPress={() => addToCart(product)}
          >
            <Plus
              color='white'
              size={16}
            />
          </Pressable>
          <Pressable
            className='rounded-lg bg-blue-500 px-4 py-2 grow flex items-center justify-center'
            onPress={() => removeFromCart(product)}
          >
            <Minus
              color='white'
              size={16}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

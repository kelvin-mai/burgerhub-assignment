import { View, Image } from 'react-native';

import type { CartItem } from '@/lib/types';
import { Minus, Plus } from '@/lib/icons';
import { Text, Button, Card } from '@/components/ui';
import { formatUSD } from '@/lib/utils';
import { useAppEffects } from '@/store';

type ProductCartItemProps = CartItem;

export const ProductCartItem: React.FC<ProductCartItemProps> = ({
  product,
  quantity,
}) => {
  const { addToCart, subtractFromCart, removeFromCart } = useAppEffects();
  const subtotal = product.price * quantity;
  return (
    <Card className='p-2 my-2'>
      <View className='flex-row gap-2'>
        <Image
          source={{ uri: product.image }}
          className='rounded-lg dark:border dark:border-zinc-600 drop-shadow-lg'
          style={{ width: 120, height: 120 }}
        />
        <View className='flex-1 justify-between'>
          <View>
            <Text className='font-bold text-lg'>{product.name}</Text>
            <Text className='text-zinc-500 dark:text-zinc-400'>
              Quantity: {quantity}
            </Text>
            <Text className='text-zinc-500 dark:text-zinc-400'>
              Price: {formatUSD(product.price)}
            </Text>
          </View>
          <View className='gap-2 flex-row mt-2'>
            <Button
              className='bg-indigo-500 grow items-center justify-center'
              onPress={() => addToCart(product)}
            >
              <Plus
                color='white'
                size={16}
              />
            </Button>
            <Button
              className='bg-indigo-500 grow items-center justify-center'
              onPress={() => subtractFromCart(product)}
            >
              <Minus
                color='white'
                size={16}
              />
            </Button>
          </View>
        </View>
      </View>
      <View className='gap-2 mt-2'>
        <Text className='text-zinc-500 text-xl'>
          Subtotal: {formatUSD(subtotal)}
        </Text>
        <Button
          className='rounded-lg bg-rose-500'
          onPress={() => removeFromCart(product)}
        >
          <Text>Remove</Text>
        </Button>
      </View>
    </Card>
  );
};

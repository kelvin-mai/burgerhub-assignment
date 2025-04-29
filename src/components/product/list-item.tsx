import { Image, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import type { APIProduct } from '@/lib/types';
import { Text, Card } from '@/components/ui';
import { useAppActions } from '@/store';
import { formatUSD } from '@/lib/utils';

type ProductItem = { product: APIProduct };

export const ProductListItem: React.FC<ProductItem> = ({ product }) => {
  const { setSelectedProduct } = useAppActions();
  const { navigate } = useRouter();

  const handlePress = () => {
    setSelectedProduct(product);
    navigate('/product-details');
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Card className='p-2 flex-row gap-2 my-2'>
        <Image
          source={{ uri: product.image }}
          className='rounded-lg dark:border dark:border-zinc-600 drop-shadow-lg'
          style={{ width: 120, height: 120 }}
        />
        <View className='flex-1'>
          <Text className='font-bold text-lg'>{product.name}</Text>
          <Text className='text-zinc-500 dark:text-zinc-400'>
            {product.description}
          </Text>
          <Text className='text-zinc-500 dark:text-zinc-400'>
            {formatUSD(product.price)}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

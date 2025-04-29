import { Image, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import type { APIProduct } from '@/lib/types';
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
      <View className='p-2 flex flex-row gap-2 border rounded-lg mx-2 my-1 border-slate-400'>
        <Image
          source={{ uri: product.image }}
          className='rounded-lg'
          style={{ width: 120, height: 120 }}
        />
        <View className='flex-1'>
          <Text className='font-bold text-lg'>{product.name}</Text>
          <Text>{product.description}</Text>
          <Text>{formatUSD(product.price)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

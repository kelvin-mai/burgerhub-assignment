import { APIProduct } from '@/lib/types';
import { FlatList, Image, Text, View } from 'react-native';

type ProductItem = APIProduct;

export const ProductListItem: React.FC<ProductItem> = ({
  image,
  name,
  description,
}) => {
  return (
    <View className='p-2 flex flex-row gap-2 border rounded-lg mx-2 my-1 border-slate-400 shadow'>
      <Image
        source={{ uri: image }}
        className='rounded-lg'
        style={{ width: 120, height: 120 }}
      />
      <View className='flex-1'>
        <Text className='font-bold text-lg'>{name}</Text>
        <Text className='text-wrap'>{description}</Text>
      </View>
    </View>
  );
};

type ProductListProps = {
  products: APIProduct[];
};

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <ProductListItem
          key={item.id}
          {...item}
        />
      )}
    />
  );
};

import { useEffect } from 'react';
import { ActivityIndicator, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';

import { ProductListItem } from '@/components/product';
import { Text } from '@/components/ui';
import { useAppEffects, useAppStore } from '@/store';

export default function HomeScreen() {
  const { products, loading } = useAppStore();
  const { loadProducts } = useAppEffects();

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <SafeAreaView edges={['bottom']}>
      <Stack.Screen options={{ title: 'Home' }} />
      {loading ? (
        <View className='items-center justify-center h-screen'>
          <ActivityIndicator testID='home-loading-indicator' />
        </View>
      ) : products.length > 0 ? (
        <View className='px-2 pt-2'>
          <FlatList
            data={products}
            testID='home-products-list'
            renderItem={({ item }) => (
              <ProductListItem
                key={item.id}
                product={item}
              />
            )}
          />
        </View>
      ) : (
        <View className='flex items-center justify-center min-h-full'>
          <Text
            className='text-lg text-center'
            testID='home-no-products-text'
          >
            There are currently no available items. Please try again later.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

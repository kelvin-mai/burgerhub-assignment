import { useEffect } from 'react';
import { ScrollView, ActivityIndicator, View, FlatList } from 'react-native';
import { Tabs } from 'expo-router';

import { ProductListItem } from '@/components/product';
import { useAppEffects, useAppStore } from '@/store';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomePage() {
  const { products, loading } = useAppStore();
  const { loadProducts } = useAppEffects();

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <SafeAreaView edges={['bottom']}>
      <Tabs.Screen options={{ title: 'Home' }} />
      {loading ? (
        <View className='items-center justify-center h-screen'>
          <ActivityIndicator />
        </View>
      ) : (
        <View className='px-2 pt-2'>
          <FlatList
            data={products}
            renderItem={({ item }) => (
              <ProductListItem
                key={item.id}
                product={item}
              />
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

import { useEffect } from 'react';
import { ScrollView, ActivityIndicator, View, FlatList } from 'react-native';
import { Tabs } from 'expo-router';

import { ProductListItem } from '@/components/product';
import { useAppEffects, useAppStore } from '@/store';

export default function HomePage() {
  const { products, loading } = useAppStore();
  const { loadProducts } = useAppEffects();

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <ScrollView className='min-h-screen'>
      <Tabs.Screen options={{ title: 'Home' }} />
      {loading ? (
        <View className='flex items-center justify-center h-screen'>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <ProductListItem
              key={item.id}
              product={item}
            />
          )}
        />
      )}
    </ScrollView>
  );
}

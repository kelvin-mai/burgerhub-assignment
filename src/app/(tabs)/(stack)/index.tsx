import { useEffect, useState } from 'react';
import { Text, ScrollView } from 'react-native';
import { Tabs } from 'expo-router';

import { ProductList } from '@/components/product/list';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const loadBurgers = async () => {
    const res = await fetch('https://burgerhub00.github.io/data/products.json');
    const { products } = await res.json();
    setProducts(products);
    setLoaded(true);
  };

  useEffect(() => {
    loadBurgers();
  }, []);

  console.log('products', products);

  return (
    <ScrollView className='min-h-screen'>
      <Tabs.Screen options={{ title: 'Home' }} />
      {loaded ? (
        <ProductList products={products} />
      ) : (
        <Text className='text-2xl'>
          Edit app/index.tsx to edit this screen.
        </Text>
      )}
    </ScrollView>
  );
}

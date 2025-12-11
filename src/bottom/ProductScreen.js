import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../services/Api';
import Header from '../common/Header';
import { useDispatch } from 'react-redux';
import { addItemToCart, addToWishlist } from '../redux/actions/Actions';

const ProductScreen = () => {
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const usdToInr = 89.81;

  useEffect(() => {
    api
      .get('/products')
      .then(response => {
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Loading more products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.center, { backgroundColor: 'white', flex: 1 }]}>
        <Text style={{ color: 'red', fontSize: 18, fontWeight: '600' }}>
          {error}
        </Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.images[0] }} style={styles.image} />
      <View style={{ flexDirection: 'row' }}>
        <View style={{ height: '100%', width: '65%' }}>
          <Text numberOfLines={1} style={styles.title}>
            {item.title}
          </Text>
          <Text style={styles.price}>₹{Math.round(usdToInr * item.price)}</Text>
        </View>
        <Text
          style={{
            fontSize: 12,
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 3,
            paddingVertical: 3,
            alignSelf: 'center',
            top: 10,
          }}
          onPress={x => {
            dispatch(addItemToCart(item));
          }}
        >
          Add Item
        </Text>
      </View>
      <TouchableOpacity
        style={{
          width: 30,
          height: 30,
          backgroundColor: '#ffffffcd',
          borderRadius: 20,
          elevation: 5,
          position: 'absolute',
          top: 10,
          right: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={x => {
          dispatch(addToWishlist(item));
        }}
      >
        <Image
          source={require('../assets/heart.png')}
          style={{
            width: 20,
            height: 20,
          }}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FlatList
        data={product}
        // data={product.filter(item => item.category === 'beauty')}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 4 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        ListFooterComponent={<View style={{ height: 40 }} />}
      />
    </SafeAreaView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    width: '49%',
    height: 200,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 8,
    backgroundColor: '#e8e8e8ff',
    padding: 10,
  },
  image: { width: 150, height: '70%', resizeMode: 'contain', marginBottom: 10 },
  title: { fontWeight: 'bold', fontSize: 14 },
  price: { color: '#000', marginTop: 4, fontSize: 14, fontWeight: '700' },
});

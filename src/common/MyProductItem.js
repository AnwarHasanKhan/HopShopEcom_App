import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

const MyProductItem = ({ item, onAddToCart, onAddWishlist }) => {
  const usdToInr = 89.81;
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: item.image }}
        style={{
          width: '100%',
          height: '75%',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
        resizeMode="cover"
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: '30%',
          width: '100%',
          padding: 5,
        }}
      >
        <View style={{ height: '100%', width: '65%' }}>
          <Text
            style={{
              height: '40%',
              fontSize: 14,
              fontWeight: '600',
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{
              height: '60%',
              fontSize: 14,
              fontWeight: '500',
            }}
          >₹{Math.round(usdToInr * item.price)}</Text>
        </View>
        <View style={{ top: 10, alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => {
              onAddToCart(item);
            }}
          >
            <Text
              style={{
                fontSize: 12,
                borderWidth: 1,
                borderRadius: 5,
                paddingHorizontal: 3,
                paddingVertical: 3,
              }}
            >
              Add Item
            </Text>
          </TouchableOpacity>
        </View>
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
        onPress={() => {
          onAddWishlist(item);
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
};

export default MyProductItem;

const styles = StyleSheet.create({
  card: {
    width: 180,
    height: 200,
    borderRadius: 10,
    elevation: 4,
    backgroundColor: '#fff',
    marginLeft: 10,
    marginBottom: 10,
  },
});

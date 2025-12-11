import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

const CartItem = ({ item, onRemoveItem }) => {
  const usdToInr = 89.81;
  return (
    <View style={styles.card}>
      <Image
        // source={{ uri: item.image }}
        source={{ uri: item.image ? item.image : item.images[0] }}
        style={{
          width: '45%',
          height: '100%',
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
        }}
        resizeMode="cover"
      />
      <View
        style={{
          width: '35%',
          height: '100%',
          padding: 5,
        }}
      >
        {item.name ? (
          <Text style={{ fontSize: 14, fontWeight: '600' }}>{item.name}</Text>
        ) : (
          <Text style={{ fontSize: 14, fontWeight: '600' }}>{item.title}</Text>
        )}
        <Text style={{ fontSize: 16, fontWeight: '500' }}>
          ₹{Math.round(usdToInr * item.price)}
        </Text>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <Text
            style={{
              backgroundColor: '#e7e7e7cd',
              borderRadius: 10,
              padding:5,
              fontSize: 12,
              fontWeight: '600',
            }}
          >
            Qty: {item.quantity || 1}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '20%',
          paddingVertical: 10,
          paddingHorizontal: 5,
          justifyContent: 'space-between',
        }}
      >
        <TouchableOpacity
          style={{
            height: 30,
            backgroundColor: '#e7e7e7cd',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            onRemoveItem();
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: '600' }}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    width: '98%',
    margin: 4,
    height: 130,
    borderRadius: 10,
    alignSelf: 'center',
    elevation: 1,
    backgroundColor: '#fff',
  },
});

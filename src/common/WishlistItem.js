import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

const WishlistItem = ({ item, onRemoveItem }) => {
  const usdToInr = 89.81;
  return (
    <View style={styles.card}>
      <Image
        // source={{ uri: item.image }}
        source={{ uri: item.image ? item.image : item.images[0] }}
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
          width: '100%',
          height: '25%',
          padding: 5,
        }}
      >
        {item.name ? (
          <Text style={{ fontSize: 14, fontWeight: '600', height:'40%' }}>{item.name}</Text>
        ) : (
          <Text style={{ fontSize: 14, fontWeight: '600', height:'40%' }}>{item.title}</Text>
        )}
        <Text
          style={{
            width: '100%',
            height: '50%',
            fontSize: 15,
            fontWeight: '500',
          }}
        >
          ₹{Math.round(usdToInr * item.price)}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          width: 26,
          height: 26,
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
          onRemoveItem();
        }}
      >
        <Image
          source={require('../assets/heartb.png')}
          style={{
            width: 16,
            height: 16,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default WishlistItem;

const styles = StyleSheet.create({
  card: {
    width: '48%',
    margin: 5,
    height: 210,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: '#fff',
  },
});

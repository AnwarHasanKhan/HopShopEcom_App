import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { removeFromWishlist } from '../redux/actions/Actions';

const MyProductItem = ({ item, onAddToCart, onAddWishlist, onRemoveItem }) => {
  const wishlistData = useSelector(state => state.Reducers2) || [];
  const isInWishlist = wishlistData.some(
    wishlistItem => wishlistItem.id === item.id,
  );
  const cartData = useSelector(state => state.Reducers) || [];
  const isInCart = cartData.some(cartItem => cartItem.id === item.id);
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
        <View style={{ height: '100%', width: '50%' }}>
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
          >
            ₹{Math.round(usdToInr * item.price)}
          </Text>
        </View>
        {isInCart ? (
          <View style={{ top: 10, alignItems: 'center' }}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: 6,
                paddingVertical: 3,
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center',
                backgroundColor:'#532280ff',
                gap:5
              }}
              onPress={() => {
                onAddToCart(item);
              }}
            >
              <Image
                source={require('../assets/check.png')}
                style={{
                  width: 15,
                  height: 15,
                  alignSelf: 'center',
                  tintColor:'#fff'
                }}
              />
              <Text
                style={{
                  fontSize: 13,
                  color:'#fff'
                }}
              >
                Added
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ top: 10, alignItems: 'center' }}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: 6,
                paddingVertical: 3,
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center',
                gap:5
              }}
              onPress={() => {
                onAddToCart(item);
              }}
            >
              <Image
                source={require('../assets/bag.png')}
                style={{
                  width: 15,
                  height: 15,
                  alignSelf: 'center',
                }}
              />
              <Text
                style={{
                  fontSize: 13,
                }}
              >
                Add
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {isInWishlist ? (
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
            onRemoveItem();
          }}
        >
          <Image
            source={require('../assets/heartb.png')}
            style={{
              width: 20,
              height: 20,
            }}
          />
        </TouchableOpacity>
      ) : (
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
      )}
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

import { FlatList, Text, View } from 'react-native';
import React from 'react';
import Header from '../common/Header';
import CartItem from '../common/CartItem';
import CartEmpty from '../common/CartEmpty';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../redux/actions/Actions';
import CommonButton from '../common/CommonButton';
import { useNavigation } from '@react-navigation/native';
import { REMOVE_FROM_CART } from '../redux/ActionTypes';

const Cart = () => {
  const cartData = useSelector(state => state.Reducers);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const usdToInr = 89.81;
  const platformFee = 55;
  const deliveryFee = 40;

  const getTotal = () => {
    let tempTotal = 0;
    cartData.map(item => {
      tempTotal =
        tempTotal + Math.round(item.price * usdToInr * (item.quantity || 1));
    });
    return tempTotal;
  };

  const getGrandTotal = () => {
    return getTotal() + platformFee + deliveryFee;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        onPress={() => {
          navigation.goBack();
        }}
      />
      {cartData.length > 0 ? (
        <FlatList
          data={cartData}
          keyExtractor={(item, index) => index.toString()}
          paddingBottom={100}
          renderItem={({ item, index }) => (
            <CartItem
              item={item}
              onRemoveItem={() =>
                dispatch({ type: REMOVE_FROM_CART, payload: item })
              }
            />
          )}
        />
      ) : (
        <CartEmpty />
      )}
      {cartData.length > 0 && (
        <View
          style={{
            alignSelf: 'center',
            width: '100%',
            backgroundColor: '#fff',
          }}
        >
          <View
            style={{
              borderTopWidth: 0.5,
              padding: 1,
              backgroundColor:'#000000ff'
            }}
          >
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTopWidth: 0.5,
              padding: 10,
              paddingRight: 20,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>SubTotal</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              ₹{getTotal()}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTopWidth: 0.5,
              padding: 10,
              paddingRight: 20,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              Platform Fee
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: 'rgba(36, 165, 1, 1)',
              }}
            >
              ₹ +{platformFee}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTopWidth: 0.5,
              padding: 10,
              paddingRight: 20,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              Delivery Charge
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: 'rgba(36, 165, 1, 1)',
              }}
            >
              ₹ +{deliveryFee}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTopWidth: 0.5,
              padding: 10,
              paddingRight: 20,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              ₹{getGrandTotal()}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              paddingBottom:50
            }}
          >
            <CommonButton
              title={'Checkout'}
              bgcolor={'#8e6bf0ff'}
              textcolor={'#fff'}
              size={18}
              thick={'700'}
              onPress={() => {
                navigation.navigate('Checkout');
              }}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Cart;

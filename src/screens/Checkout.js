import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Header from '../common/Header';
import RazorpayCheckout from 'react-native-razorpay';
import {
  addItemToCart,
  addOrder,
  clearCart,
  removeFromCart,
} from '../redux/actions/Actions';
import CommonButton from '../common/CommonButton';

const Checkout = () => {
  const navigation = useNavigation();
  const cartData = useSelector(state => state.Reducers);
  const addressList = useSelector(state => state.AddressReducer);
  const [selectedAddress, setSelectedAddress] = useState('');
  const dispatch = useDispatch();

  const usdToInr = 89.81;

  const getTotal = () => {
    let tempTotal = 0;
    cartData.map(item => {
      tempTotal = tempTotal + usdToInr * item.price;
    });
    return tempTotal;
  };

  const handleCheckout = () => {
    var options = {
      description: `Payment for ${cartData.length} item`,
      image:
        'https://images.pexels.com/photos/12495665/pexels-photo-12495665.jpeg',
      currency: 'INR',
      key: 'rzp_test_Rn3vbQb3deaZ9q',
      amount: '' + parseInt(getTotal() * 100) + '', // amount in Rupee
      name: 'RazorPay!!',
      prefill: {
        email: 'anwar@example.com',
        contact: '7237906353',
        name: 'Anwar Khan',
      },
      theme: { color: '#8e6bf0ff' },
    };

    RazorpayCheckout.open(options)
      .then(data => {
        dispatch(
          addOrder({
            item: cartData,
            total: getTotal(),
            address: selectedAddress,
            paymentId: data.razorpay_payment_id,
            date: new Date(),
          }),
        );
        navigation.navigate('OrderSuccess', {
          status: 'success',
        });
        dispatch(clearCart());
        setSelectedAddress('');
      })
      .catch(error => {
        navigation.navigate('OrderSuccess', {
          status: 'failed',
        });
        dispatch(clearCart());
        setSelectedAddress('');
      });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header onPress={() => navigation.goBack()} />
      <ScrollView style={{ marginBottom: 10 }}>
        <View style={{ justifyContent: 'center', padding: 5 }}>
          <FlatList
            data={cartData}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    width: '98%',
                    height: 110,
                    alignSelf: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginVertical: 3,
                    gap: 10,
                    borderRadius: 15,
                    backgroundColor: '#ffffffff',
                    elevation: 3,
                  }}
                >
                  <Image
                    // source={{ uri: item.image }}
                    source={{ uri: item.image ? item.image : item.images[0] }}
                    style={{
                      width: 110,
                      height: 100,
                      borderRadius: 10,
                      margin: 6,
                    }}
                  />
                  <View style={{ width: '40%', height: '80%' }}>
                    {item.name ? (
                      <Text style={{ fontSize: 14, fontWeight: '600' }}>
                        {item.name}
                      </Text>
                    ) : (
                      <Text style={{ fontSize: 14, fontWeight: '600' }}>
                        {item.title}
                      </Text>
                    )}
                    <Text style={{ fontSize: 14, fontWeight: '500' }}>
                      ₹{Math.round(usdToInr * item.price)}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '15%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      backgroundColor: '#f3f3f3ff',
                      paddingHorizontal: 10,
                      borderRadius: 20,
                      top: 10,
                      right: 10,
                      position: 'absolute',
                    }}
                  >
                    <Pressable
                      onPress={() => {
                        dispatch(addItemToCart(item));
                      }}
                    >
                      <Text style={{ fontSize: 18 }}>+</Text>
                    </Pressable>
                    <Pressable onPress={() => dispatch(removeFromCart(index))}>
                      <Text style={{ fontSize: 20 }}>-</Text>
                    </Pressable>
                  </View>
                </View>
              );
            }}
          />
        </View>
        {cartData.length === 0 && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'justify',
              margin: 10,
              paddingHorizontal: 10,
              gap: 10,
            }}
          >
            <Text
              style={{
                textAlign: 'justify',
              }}
            >
              “Oops! Looks like your cart is empty.”
            </Text>
            <Text
              style={{
                textAlign: 'justify',
              }}
            >
              Add something you’ll love.
            </Text>
          </View>
        )}
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTopWidth: 0.5,
            padding: 10,
            paddingRight: 20,
            backgroundColor: 'white',
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            ₹{Math.round(getTotal())}
          </Text>
        </View>
        <View style={{ marginBottom: 25 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              margin: 5,
              fontStyle: 'italic',
              borderBottomWidth: 0.5,
            }}
          >
            Delivery Address
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              marginLeft: 10,
            }}
          >
            {selectedAddress == ''
              ? 'Select delivery address'
              : selectedAddress}
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            height: 35,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTopWidth: 0.5,
          }}
        >
          <Text
            style={{
              width: '70%',
              fontSize: 18,
              fontWeight: 'bold',
              marginLeft: 5,
              fontStyle: 'italic',
            }}
          >
            Saved Addresses
          </Text>
          <TouchableOpacity
            style={{
              width: '30%',
              height: 30,
              marginRight: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              navigation.navigate('AddAddress');
            }}
          >
            <Text style={{ fontWeight: '500' }}>+Add Address</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={addressList}
            scrollEnabled={false}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    width: '100%',
                    borderWidth: 0.2,
                    borderColor: '#8e8e8e',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 10,
                  }}
                >
                  <View style={{ width: '80%' }}>
                    <Text style={{ fontWeight: 'bold' }}>
                      Building: {item.building}
                    </Text>
                    <Text style={{ fontWeight: 'bold' }}>
                      City: {item.city}
                    </Text>
                    <Text style={{ fontWeight: 'bold' }}>
                      Pincode: {item.pincode}
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={{
                        borderWidth: 1,
                        paddingHorizontal: 14,
                        borderRadius: 10,
                        paddingVertical: 5,
                      }}
                      onPress={() => {
                        setSelectedAddress(
                          'Building: ' +
                            item.building +
                            ' \nCity: ' +
                            item.city +
                            ' \nPincode: ' +
                            item.pincode,
                        );
                      }}
                    >
                      <Text style={{ fontWeight: '500', fontSize: 12 }}>
                        Select
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        </View>
        <CommonButton
          title={'Place Order'}
          bgcolor={'#000000ff'}
          textcolor={'#fff'}
          size={18}
          thick={'700'}
          onPress={() => {
            if (selectedAddress !== '' && cartData.length > 0) {
              handleCheckout();
            } else {
              if (cartData.length === 0) {
                Alert.alert('Your cart is empty.');
              } else if (selectedAddress === '') {
                Alert.alert('Please select an address before checkout.');
              }
            }
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Checkout;

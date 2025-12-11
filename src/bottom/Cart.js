import { FlatList, View } from 'react-native';
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
            position: 'absolute',
            alignSelf: 'center',
            width: '100%',
            elevation: 5,
            bottom: 80,
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
      )}
    </SafeAreaView>
  );
};

export default Cart;

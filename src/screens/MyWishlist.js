import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Header from '../common/Header';
import WishlistItem from '../common/WishlistItem';
import WishlistEmpty from '../common/WishlistEmpty';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlist } from '../redux/actions/Actions';
import { useNavigation } from '@react-navigation/native';

const MyWishlist = () => {
  const [wishList, setWishList] = useState([]);
  const navigation = useNavigation();
  const wishlistData = useSelector(state => state.Reducers2);
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          width: '100%',
          height: 50,
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomWidth: 0.5,
        }}
      >
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            source={require('../assets/back.png')}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>My Wishlist</Text>
      </View>
      <FlatList
        data={wishlistData}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<WishlistEmpty />}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 5 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item, index }) => {
          return (
            <WishlistItem
              item={item}
              onRemoveItem={() => {
                dispatch(removeFromWishlist(index));
              }}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default MyWishlist;

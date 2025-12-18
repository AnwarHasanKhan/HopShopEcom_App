import { FlatList } from 'react-native';
import React, { useState } from 'react';
import Header from '../common/Header';
import WishlistItem from '../common/WishlistItem';
import WishlistEmpty from '../common/WishlistEmpty';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlist } from '../redux/actions/Actions';

const Wishlist = () => {
  const [wishList, setWishList] = useState([]);
  const wishlistData = useSelector(state => state.Reducers2);
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <FlatList
        data={wishlistData}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<WishlistEmpty />}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 5 }}
        columnWrapperStyle={{ justifyContent: 'flex-start' }}
        renderItem={({ item, index }) => {
          return (
            <WishlistItem
              item={item}
              onRemoveItem={() => {
                dispatch(removeFromWishlist(item));
              }}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Wishlist;

import { View, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import Main from '../bottom/Main';
import Search from '../bottom/Search';
import Cart from '../bottom/Cart';
import Wishlist from '../bottom/Wishlist';
import Profile from '../bottom/Profile';
import ProductScreen from '../bottom/ProductScreen';
import { Text } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import Checkout from './Checkout';

const Home = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const cartData = useSelector(state => state.Reducers);
  const WishlistData = useSelector(state => state.Reducers2);

  return (
    <View style={{ flex: 1 }}>
      {selectedTab == 0 ? (
        <Main />
      ) : selectedTab == 1 ? (
        <Search />
      ) : selectedTab == 2 ? (
        <Cart />
      ) : // <Checkout />
      selectedTab == 3 ? (
        <Wishlist />
      ) : selectedTab == 4 ? (
        <Profile />
      ) : (
        <ProductScreen />
      )}
      <View
        style={{
          width: '100%',
          height: 70,
          backgroundColor: '#fff',
          position: 'absolute',
          bottom: 0,
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom:'10',
        }}
      >
        <TouchableOpacity
          style={{
            width: '20%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setSelectedTab(0);
          }}
        >
          <Image
            source={require('../assets/home.png')}
            style={{
              width: 24,
              height: 24,
              tintColor: selectedTab == 0 ? '#000000ff' : '#8e8e8e',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '20%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setSelectedTab(1);
          }}
        >
          <Image
            source={require('../assets/search.png')}
            style={{
              width: 24,
              height: 24,
              tintColor: selectedTab == 1 ? '#000000ff' : '#8e8e8e',
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            width: '20%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={{
              width: 44,
              height: 44,
              backgroundColor: selectedTab == 2 ? '#000000ff' : '#7949feff',
              borderRadius: 22,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              setSelectedTab(2);
            }}
          >
            <Image
              source={require('../assets/bag.png')}
              style={{
                width: 24,
                height: 24,
                tintColor: selectedTab == 2 ? '#c7c7c7ff' : '#ffffffff',
              }}
            />
            {cartData.length > 0 && (
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: 'red',
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  top: 5,
                  right: 5,
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: '700',
                  }}
                >
                  {cartData.length}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            width: '20%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setSelectedTab(3);
          }}
        >
          <Image
            source={require('../assets/heart.png')}
            style={{
              width: 24,
              height: 24,
              tintColor: selectedTab == 3 ? '#000000ff' : '#8e8e8e',
            }}
          />
          {WishlistData.length > 0 && (
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: 'red',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: 12,
                right: 20,
              }}
            >
              <Text
                style={{
                  color: '#ffffffff',
                  fontWeight: '700',
                }}
              >
                {WishlistData.length}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '20%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setSelectedTab(4);
          }}
        >
          <Image
            source={require('../assets/user.png')}
            style={{
              width: 24,
              height: 24,
              tintColor: selectedTab == 4 ? '#000' : '#8e8e8e',
            }}
          />
        </TouchableOpacity>
      </View>
      {selectedTab !== 5 && (
        <TouchableOpacity
          style={{
            width: 100,
            height: 35,
            borderRadius: 10,
            backgroundColor: '#4343d9ff',
            position: 'absolute',
            bottom: 70,
            elevation: 2,
            right: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setSelectedTab(5);
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: '600', color: '#fff' }}>
            More Products
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Home;

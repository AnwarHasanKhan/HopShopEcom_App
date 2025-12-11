import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../common/Header';
import { products } from '../models/Products';
import MyProductItem from '../common/MyProductItem';
import { useDispatch } from 'react-redux';
import { addItemToCart, addToWishlist } from '../redux/actions/Actions';

const Main = () => {
  const dispatch = useDispatch();
  const [categoryList, setCategoryList] = useState([]);
  const [tshirtList, setTshirtList] = useState([]);
  const [jeansList, setJeansList] = useState([]);
  const [shoesList, setShoesList] = useState([]);
  const [jacketList, setJacketList] = useState([]);
  const [slipperList, setSlipperList] = useState([]);
  const [trouserList, setTrouserList] = useState([]);
  const [tshirtopen, setTshirtOpen] = useState(true);
  const [jeansOpen, setJeansOpen] = useState(true);
  const [shoesOpen, setShoesOpen] = useState(true);
  const [jacketOpen, setJacketOpen] = useState(true);
  const [slipperOpen, setSlipperOpen] = useState(true);
  const [trouserOpen, setTrouserOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      let tempCategory = [];
      products.category.map(item => {
        tempCategory.push(item);
      });
      setCategoryList(tempCategory);
      setTshirtList(products.category[0].data);
      setJeansList(products.category[1].data);
      setShoesList(products.category[2].data);
      setJacketList(products.category[3].data);
      setSlipperList(products.category[4].data);
      setTrouserList(products.category[5].data);
      setLoading(false); 
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10, fontSize: 16, fontWeight: '500' }}>
          Loading products...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Header />
        <View
          style={{
            padding: 5,
          }}
        >
          <ImageBackground
            source={require('../assets/6560450.jpg')}
            style={{
              width: '100%',
              height: 150,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              overflow: 'hidden',
            }}
          >
            <Text
              style={{
                fontSize: 40,
                fontWeight: '700',
                alignSelf: 'center',
                justifyContent: 'center',
                color: 'white',
                fontStyle: 'italic',
              }}
            >
              HOPSHOP!
            </Text>
          </ImageBackground>
        </View>
        {/* <View style={{ marginTop: 20}}>
          <FlatList
            data={categoryList}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 30,
                    borderWidth: 1,
                    marginLeft: 10,
                    backgroundColor: '#dededeff',
                    borderRadius: 20,
                    elevation: 2,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: '500',
                    }}
                  >
                    {item.category}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View> */}
        <TouchableOpacity
          style={styles.categoryheader}
          onPress={() => setTshirtOpen(!tshirtopen)}
        >
          <Text style={styles.txtheader}> New Tshirts</Text>
          {tshirtopen ? (
            <Image
              source={require('../assets/down.png')}
              style={{
                width: 24,
                height: 24,
              }}
            />
          ) : (
            <Image
              source={require('../assets/next.png')}
              style={{
                width: 24,
                height: 24,
              }}
            />
          )}
        </TouchableOpacity>
        {tshirtopen && (
          <View style={{ marginTop: 10 }}>
            <FlatList
              data={tshirtList}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <MyProductItem
                    item={item}
                    onAddWishlist={x => {
                      dispatch(addToWishlist(x));
                    }}
                    onAddToCart={x => {
                      dispatch(addItemToCart(item));
                    }}
                  />
                );
              }}
            />
          </View>
        )}
        <TouchableOpacity
          style={styles.categoryheader}
          onPress={() => setJeansOpen(!jeansOpen)}
        >
          <Text style={styles.txtheader}> Jeans Collection</Text>
          {jeansOpen ? (
            <Image
              source={require('../assets/down.png')}
              style={{
                width: 24,
                height: 24,
              }}
            />
          ) : (
            <Image
              source={require('../assets/next.png')}
              style={{
                width: 24,
                height: 24,
              }}
            />
          )}
        </TouchableOpacity>
        {jeansOpen && (
          <View style={{ marginTop: 10 }}>
            <FlatList
              data={jeansList}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <MyProductItem
                    item={item}
                    onAddWishlist={x => {
                      dispatch(addToWishlist(x));
                    }}
                    onAddToCart={x => {
                      dispatch(addItemToCart(item));
                    }}
                  />
                );
              }}
            />
          </View>
        )}
        <TouchableOpacity
          style={styles.categoryheader}
          onPress={() => setShoesOpen(!shoesOpen)}
        >
          <Text style={styles.txtheader}> Shoes Collection</Text>
          {shoesOpen ? (
            <Image
              source={require('../assets/down.png')}
              style={{
                width: 24,
                height: 24,
              }}
            />
          ) : (
            <Image
              source={require('../assets/next.png')}
              style={{
                width: 24,
                height: 24,
              }}
            />
          )}
        </TouchableOpacity>
        {shoesOpen && (
          <View style={{ marginTop: 10 }}>
            <FlatList
              data={shoesList}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <MyProductItem
                    item={item}
                    onAddWishlist={x => {
                      dispatch(addToWishlist(x));
                    }}
                    onAddToCart={x => {
                      dispatch(addItemToCart(item));
                    }}
                  />
                );
              }}
            />
          </View>
        )}
        <TouchableOpacity
          style={styles.categoryheader}
          onPress={() => setJacketOpen(!jacketOpen)}
        >
          <Text style={styles.txtheader}> Jackets Collection</Text>
          {jacketOpen ? (
            <Image
              source={require('../assets/down.png')}
              style={{
                width: 24,
                height: 24,
              }}
            />
          ) : (
            <Image
              source={require('../assets/next.png')}
              style={{
                width: 24,
                height: 24,
              }}
            />
          )}
        </TouchableOpacity>
        {jacketOpen && (
          <View style={{ marginTop: 10 }}>
            <FlatList
              data={jacketList}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <MyProductItem
                    item={item}
                    onAddWishlist={x => {
                      dispatch(addToWishlist(x));
                    }}
                    onAddToCart={x => {
                      dispatch(addItemToCart(item));
                    }}
                  />
                );
              }}
            />
          </View>
        )}
        <TouchableOpacity
          style={styles.categoryheader}
          onPress={() => setSlipperOpen(!slipperOpen)}
        >
          <Text style={styles.txtheader}>Slippers Collection</Text>
          {slipperOpen ? (
            <Image
              source={require('../assets/down.png')}
              style={{
                width: 24,
                height: 24,
              }}
            />
          ) : (
            <Image
              source={require('../assets/next.png')}
              style={{
                width: 24,
                height: 24,
              }}
            />
          )}
        </TouchableOpacity>
        {slipperOpen && (
          <View style={{ marginTop: 10 }}>
            <FlatList
              data={slipperList}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <MyProductItem
                    item={item}
                    onAddWishlist={x => {
                      dispatch(addToWishlist(x));
                    }}
                    onAddToCart={x => {
                      dispatch(addItemToCart(item));
                    }}
                  />
                );
              }}
            />
          </View>
        )}
        <TouchableOpacity
          style={styles.categoryheader}
          onPress={() => setTrouserOpen(!trouserOpen)}
        >
          <Text
            style={{
              color: '#000',
              fontSize: 16,
              fontWeight: '800',
              marginBottom: trouserOpen ? 0 : 60,
            }}
          >
            Trousers Collection
          </Text>
          {trouserOpen ? (
            <Image
              source={require('../assets/down.png')}
              style={{
                width: 24,
                height: 24,
              }}
            />
          ) : (
            <Image
              source={require('../assets/next.png')}
              style={{
                width: 24,
                height: 24,
              }}
            />
          )}
        </TouchableOpacity>
        {trouserOpen && (
          <View style={{ marginTop: 10, marginBottom: 50 }}>
            <FlatList
              data={trouserList}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <MyProductItem
                    item={item}
                    onAddWishlist={x => {
                      dispatch(addToWishlist(x));
                    }}
                    onAddToCart={x => {
                      dispatch(addItemToCart(x));
                    }}
                  />
                );
              }}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  categoryheader: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  txtheader: {
    color: '#000',
    fontSize: 16,
    fontWeight: '800',
  },
});
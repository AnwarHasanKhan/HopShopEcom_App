import { View, Text, FlatList, Image, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../common/Header';
import CustomTextInput from '../common/CustomTextInput';
import CommonButton from '../common/CommonButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { products } from '../models/Products';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../redux/actions/Actions';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const dispatch = useDispatch();

  const allProducts = products.category.flatMap(cat => cat.data);
  const usdToInr = 89.81;

  const handleSearch = () => {
    const filtered = allProducts.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()),
    );
    setResults(filtered);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:'#ffffff' }}>
      <Header />
      {query === '' || results.length == 0 ? (
        <Text style={{ marginTop: 20, textAlign: 'center', color: 'gray' }}>
          No results found.
        </Text>
      ) : (
        <FlatList
          style={{ padding: 5 }}
          data={results}
          showsHorizontalScrollIndicator={false}
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
                    width: '22%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#f3f3f3ff',
                    paddingHorizontal: 10,
                    justifyContent: 'center',
                    padding: 5,
                    borderRadius: 20,
                    top: 10,
                    right: 10,
                    position: 'absolute',
                  }}
                >
                  <Pressable
                    style={{
                      borderRadius: 8,
                      paddingHorizontal: 6,
                      paddingVertical: 3,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 5,
                    }}
                    onPress={() => {
                      dispatch(addItemToCart(item));
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
                  </Pressable>
                </View>
              </View>
            );
          }}
        />
      )}
      <View style={{ paddingBottom: 55 }}>
        <CustomTextInput
          placeholder={'Search Products Here...'}
          icon={require('../assets/search.png')}
          value={query}
          onChangeText={txt => setQuery(txt)}
        />
        <CommonButton
          title={'Search'}
          bgcolor={'#000'}
          textcolor={'#fff'}
          size={18}
          thick={'700'}
          onPress={handleSearch}
        />
      </View>
    </SafeAreaView>
  );
};

export default Search;

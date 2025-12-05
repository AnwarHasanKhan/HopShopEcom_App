import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AddressItem from '../common/AddressItem';
import { deleteAddress } from '../redux/actions/Actions';

let addressList = [];
const MyAddress = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const addressList = useSelector(state => state.AddressReducer);
  const dispatch = useDispatch();
  console.log(addressList);

  return (
    <SafeAreaView>
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
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>My Addresses</Text>
      </View>
      <FlatList
        data={addressList}
        renderItem={({ item, index }) => {
          return (
            <AddressItem
              item={item}
              onRemoveItem={() => {
                dispatch(deleteAddress(index));
              }}
            />
          );
        }}
      />
      <TouchableOpacity
        style={{
          margin: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          navigation.navigate('AddAddress');
        }}
      >
        <Text style={{ fontWeight: '700', textDecorationLine: 'underline' }}>
          ADD NEW ADDRESS
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MyAddress;

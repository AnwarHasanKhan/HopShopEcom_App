import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomTextInput from '../common/CustomTextInput';
import { useNavigation } from '@react-navigation/native';
import CommonButton from '../common/CommonButton';
import { useDispatch } from 'react-redux';
import { addAddress } from '../redux/actions/Actions';

const AddAddress = () => {
  const navigation = useNavigation();
  const [city, setCity] = useState('');
  const [building, setBuilding] = useState('');
  const [pincode, setPincode] = useState('');
  const dispatch = useDispatch();

  const handleChange = text => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setPincode(numericValue);
  };
  return (
    <SafeAreaView>
      <View
        style={{
          width: '100%',
          height: 50,
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
            marginLeft: 10,
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
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            marginRight: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            if ((city !== '' && building !== '', pincode !== '')) {
              dispatch(
                addAddress({
                  building: building,
                  city: city,
                  pincode: pincode,
                }),
              );
              navigation.goBack();
            }
          }}
        >
          <Image
            source={require('../assets/add.png')}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 30 }}>
        <CustomTextInput
          placeholder={'Enter House / Flat / Building...'}
          value={building}
          onChangeText={txt => setBuilding(txt)}
          icon={require('../assets/building.png')}
        />
        <CustomTextInput
          placeholder={'Enter City...'}
          value={city}
          onChangeText={txt => setCity(txt)}
          icon={require('../assets/location-pin.png')}
        />
        <CustomTextInput
          placeholder={'Enter Pincode...'}
          keyboardType={'numeric'}
          value={pincode}
          onChangeText={handleChange}
          icon={require('../assets/pincode.png')}
        />
      </View>
      <CommonButton
        title={'Add Address'}
        bgcolor={'#000'}
        textcolor={'#fff'}
        size={18}
        thick={'700'}
        onPress={() => {
          if ((city !== '' && building !== '', pincode !== '')) {
            dispatch(
              addAddress({ building: building, city: city, pincode: pincode }),
            );
            navigation.goBack();
          }
        }}
      />
    </SafeAreaView>
  );
};

export default AddAddress;

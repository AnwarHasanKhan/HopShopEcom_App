import { View, Text, Alert } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomTextInput from '../common/CustomTextInput';
import CommonButton from '../common/CommonButton';
import Header from '../common/Header';

const Forget = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'justify',
          margin: 10,
          marginTop: 150,
          paddingHorizontal: 10,
          gap: 10,
        }}
      >
        <Text
          style={{
            textAlign: 'justify',
          }}
        >
          Let’s Keep Things Secure 🔒
        </Text>
        <Text
          style={{
            textAlign: 'justify',
          }}
        >
          Click below to get your 4-digit verification code.
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}
      >
        <CustomTextInput
          placeholder={'Enter Email...'}
          icon={require('../assets/mail.png')}
        />
        <CustomTextInput
          placeholder={'Enter Mobile...'}
          icon={require('../assets/mobile-phone.png')}
        />
        <CommonButton
          title={'Get OTP'}
          bgcolor={'#000'}
          textcolor={'#fff'}
          size={20}
          thick={'600'}
          onPress={() => {
            Alert.alert('OTP has been sent to your mobile number.');
            navigation.goBack();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Forget;

import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import CommonButton from '../common/CommonButton';
import CustomTextInput from '../common/CustomTextInput';
import auth from '@react-native-firebase/auth';

const SignFB = () => {
  const [email1, setEmail1] = useState();
  const [password1, setPassword1] = useState();

  const Register = () => {
    auth()
      .createUserWithEmailAndPassword(email1, password1)
      .then(() => {
        Alert.alert('Account Created');
      })
      .catch(error => {
        Alert.alert(`${error}`)
      });
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'justify',
        margin: 10,
        marginTop: 150,
        paddingHorizontal: 10,
      }}
    >
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 25,
          fontWeight: '600',
          marginTop: 20,
          color: '#000',
        }}
      >
        Register Secure🔒
      </Text>
      <CustomTextInput
        placeholder={'Enter Email...'}
        value={email1}
        onChangeText={actualData => {
          setEmail1(actualData);
        }}
        icon={require('../assets/mail.png')}
      />
      <CustomTextInput
        placeholder={'Create Password...'}
        value={password1}
        onChangeText={setPassword1}
        icon={require('../assets/padlock.png')}
      />
      <CommonButton
        title={'Register'}
        bgcolor={'#000'}
        textcolor={'#fff'}
        size={20}
        thick={'600'}
        onPress={Register}
      />
    </View>
  );
};

export default SignFB;

const styles = StyleSheet.create({});

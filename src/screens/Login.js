import { View, Text, Image, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import CustomTextInput from '../common/CustomTextInput';
import CommonButton from '../common/CommonButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [badEmail, setBadEmail] = useState(false);
  const [badPassword, setBadPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const submit = () => {
    if (email !== '' && email.includes('@') && email.includes('.com')) {
      setBadEmail(false);
    } else {
      setBadEmail(true);
    }
    if (password !== '') {
      setBadPassword(false);
    } else {
      setBadPassword(true);
    }
    getData();
  };

  const getData = async () => {
    try {
      const usersData = await AsyncStorage.getItem('users');
      const users = usersData ? JSON.parse(usersData) : [];

      if (users.length === 0) {
        Alert.alert('No users found. Please sign up first.');
        return;
      }

      const matchedUser = users.find(
        user => user.Email === email && user.Password === password,
      );

      console.log(users);
      if (matchedUser) {
        await AsyncStorage.setItem('loggedInUser', JSON.stringify(matchedUser));
        navigation.navigate('Home');
      } else {
        Alert.alert('Invalid Email or Password!');
      }
    } catch (error) {
      console.log('Error reading users:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require('../assets/playstore.png')}
        style={{
          width: 90,
          height: 90,
          alignSelf: 'center',
          marginTop: 200,
          borderRadius: 10,
        }}
      />
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 25,
          fontWeight: '600',
          marginTop: 20,
          color: '#000',
        }}
      >
        Login
      </Text>
      <CustomTextInput
        placeholder={'Enter Email...'}
        value={email}
        onChangeText={actualData => setemail(actualData)}
        icon={require('../assets/mail.png')}
      />
      {badEmail === true && (
        <Text
          style={{
            marginTop: 5,
            marginLeft: 35,
            color: 'red',
            fontSize: 12,
          }}
        >
          Please Enter Email ID
        </Text>
      )}
      {/* <CustomTextInput
        placeholder={'Enter Password...'}
        value={password}
        onChangeText={actualData => setPassword(actualData)}
        icon={require('../assets/padlock.png')}
        type
      /> */}
      <CustomTextInput
        placeholder={'Create Password...'}
        value={password}
        onChangeText={setPassword}
        icon={require('../assets/padlock.png')}
        secureTextEntry={!showPassword}
        rightIcon={
          !showPassword
            ? require('../assets/eye-off.png')
            : require('../assets/eye.png')
        }
        onRightIconPress={() => setShowPassword(!showPassword)}
      />
      {badPassword === true && (
        <Text
          style={{
            marginTop: 5,
            marginLeft: 35,
            color: 'red',
            fontSize: 12,
          }}
        >
          Please Enter Password!
        </Text>
      )}
      <Text
        style={{
          fontSize: 14,
          fontWeight: '600',
          alignSelf: 'flex-end',
          marginTop: 10,
          marginRight: 30,
          textDecorationLine: 'underline',
        }}
        onPress={() => {
          navigation.navigate('Forget');
        }}
      >
        Forgot Password?
      </Text>
      <CommonButton
        title={'Login'}
        bgcolor={'#000'}
        textcolor={'#fff'}
        size={20}
        thick={'600'}
        onPress={() => {
          submit();
        }}
      />
      <Text
        style={{
          fontSize: 20,
          fontWeight: '600',
          alignSelf: 'center',
          marginTop: 20,
          textDecorationLine: 'underline',
        }}
        onPress={() => {
          navigation.navigate('SignUp');
        }}
      >
        Create New Account?
      </Text>
    </View>
  );
};

export default Login;

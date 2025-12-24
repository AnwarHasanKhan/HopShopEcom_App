import { View, Text, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import CustomTextInput from '../common/CustomTextInput';
import CommonButton from '../common/CommonButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../services/firebaseConfig';
import { useDispatch } from 'react-redux';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const Login = ({ navigation }) => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [badEmail, setBadEmail] = useState(false);
  const [badPassword, setBadPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const submit = async () => {
    if (!email || !email.includes('@') || !email.includes('.com')) {
      setBadEmail(true);
      return;
    } else setBadEmail(false);

    if (!password) {
      setBadPassword(true);
      return;
    } else setBadPassword(false);

    loginUser();
  };

  const loginUser = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // 1️⃣ Create Firestore document if not exists
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, {
          email: user.email,
          createdAt: new Date(),
        });
      }

      const profile = { uid: user.uid, email: user.email };
      await AsyncStorage.setItem('loggedInUser', JSON.stringify(profile));

      // 2️⃣ Load cart
      const cartSnap = await getDocs(collection(db, 'users', user.uid, 'cart'));
      const cartItems = cartSnap.docs.map(doc => doc.data());
      dispatch({ type: 'SET_CART', payload: cartItems });

      // 3️⃣ Load wishlist
      const wishlistSnap = await getDocs(
        collection(db, 'users', user.uid, 'wishlist'),
      );
      const wishlistItems = wishlistSnap.docs.map(doc => doc.data());
      dispatch({ type: 'SET_WISHLIST', payload: wishlistItems });

      // 4️⃣ Load addresses
      const addressesSnap = await getDocs(
        collection(db, 'users', user.uid, 'addresses'),
      );
      const addresses = addressesSnap.docs.map(doc => doc.data());
      dispatch({ type: 'SET_ADDRESS', payload: addresses });

      Alert.alert('Login Successful!');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', error.message);
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
        HOPSHOP!
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

      <CustomTextInput
        placeholder={'Enter Password...'}
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
        onPress={() => navigation.navigate('Forget')}
      >
        Forgot Password?
      </Text>

      <CommonButton
        title={'Login'}
        bgcolor={'#000'}
        textcolor={'#fff'}
        size={20}
        thick={'600'}
        onPress={submit}
      />

      <Text
        style={{
          fontSize: 20,
          fontWeight: '600',
          alignSelf: 'center',
          marginTop: 20,
          textDecorationLine: 'underline',
        }}
        onPress={() => navigation.navigate('SignUp')}
      >
        Create New Account?
      </Text>
    </View>
  );
};

export default Login;

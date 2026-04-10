import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

import { db } from '../services/firebaseAuth';
import { useBiometrics } from '../hooks/useBiometrics';

const Splash = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loginWithBiometrics, isEnrolled } = useBiometrics();

  useEffect(() => {
   setTimeout(async () => {
      const enrolled = await isEnrolled();
      if (enrolled) {
        handleBiometricLogin();
      } else {
        navigation.replace('Login');
      }
    }, 500);
  }, []);

  const handleBiometricLogin = async () => {
    const { success, error } = await loginWithBiometrics();
    if (success) {
      checkLoginStatus();
      navigation.replace('Home');
    } else if (error) {
      navigation.replace('Login');
      Alert.alert('Biometric login failed', error);
    }
  };

  const checkLoginStatus = async () => {
    try {
      const stored = await AsyncStorage.getItem('loggedInUser');
      console.log('LoggedInUser:', stored);
      if (stored) {
        const user = JSON.parse(stored);
        console.log('From Splash User:', user);
        // const cartSnap = await getDocs(collection(db, 'users', user.uid, 'cart'));
        // dispatch({ type: 'SET_CART', payload: cartSnap.docs.map(d => d.data()) });

        // const wishlistSnap = await getDocs(collection(db, 'users', user.uid, 'wishlist'),);
        // dispatch({type: 'SET_WISHLIST',payload: wishlistSnap.docs.map(d => d.data()),
        // });

        // const addressesSnap = await getDocs(collection(db, 'users', user.uid, 'addresses'));
        // dispatch({ type: 'SET_ADDRESS', payload: addressesSnap.docs.map(d => d.data()) });

        navigation.replace('Home');
      } else {
        navigation.replace('Login');
      }
    } catch (error) {
      navigation.replace('Login');
    }
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#F7F7F7'}
        hidden={false}
        translucent={false}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor:'#ffffff' }}>
        <View style={styles.container}>
          <Image
            source={require('../assets/playstore.png')}
            style={{ height: 120, width: 120, borderRadius: 20 }}
          />
          <Text style={{ fontSize: 40, color: 'black', fontWeight: 600 }}>
            HopShop!
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
});

// import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
// import React, { useEffect } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const Splash = () => {
//   const navigation = useNavigation();
//   useEffect(() => {
//     setTimeout(() => {
//       navigation.replace('Login');
//     }, 2000);
//   }, []);
//   return (
//     <>
//       <StatusBar
//         barStyle="dark-content"
//         backgroundColor={'#F7F7F7'}
//         hidden={false} // Ensure it's not hidden
//         translucent={false} // Avoid translucency
//       />
//       <SafeAreaView>
//         <View style={styles.container}>
//           <Image
//             source={require('../assets/playstore.png')}
//             style={{ height: 120, width: 120, borderRadius: 20 }}
//           />
//           <Text
//             style={{
//               fontSize: 40,
//               color: 'black',
//               fontWeight: 600,
//             }}
//           >
//             HopShop!
//           </Text>
//         </View>
//       </SafeAreaView>
//     </>
//   );
// };

// export default Splash;

// const styles = StyleSheet.create({
//   container: {
//     flex:1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: 8,
//   },
// });


import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../services/firebaseConfig';

import { auth, db } from '../services/firebaseAuth';
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

const Splash = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      checkLoginStatus();
    }, 2000);
  }, []);

  const checkLoginStatus = async () => {
    try {
      const stored = await AsyncStorage.getItem('loggedInUser');
      console.log('LoggedInUserSTORE:', stored);
      console.log('LoggedInUser:', stored);
      if (stored) {
        const user = JSON.parse(stored);
        console.log('From Splash User:',user)
        const cartSnap = await getDocs(collection(db, 'users', user.uid, 'cart'));
        dispatch({ type: 'SET_CART', payload: cartSnap.docs.map(d => d.data()) });

        const wishlistSnap = await getDocs(collection(db, 'users', user.uid, 'wishlist'));
        dispatch({ type: 'SET_WISHLIST', payload: wishlistSnap.docs.map(d => d.data()) });

        const addressesSnap = await getDocs(collection(db, 'users', user.uid, 'addresses'));
        dispatch({ type: 'SET_ADDRESS', payload: addressesSnap.docs.map(d => d.data()) });

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
      <SafeAreaView style={{flex:1}}>
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
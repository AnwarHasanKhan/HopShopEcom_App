// import {
//   View,
//   Text,
//   Image,
//   Alert,
//   StatusBar,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import React, { useState } from 'react';
// import CustomTextInput from '../common/CustomTextInput';
// import CommonButton from '../common/CommonButton';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import { signInWithEmailAndPassword } from 'firebase/auth';
// import {
//   getFirestore,
//   doc,
//   getDoc,
//   setDoc,
//   collection,
//   getDocs,
// } from 'firebase/firestore';
// import { useDispatch } from 'react-redux';

// import { auth, db } from '../services/firebaseAuth';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const Login = ({ navigation }) => {
//   const [email, setemail] = useState('');
//   const [password, setPassword] = useState('');
//   const [badEmail, setBadEmail] = useState(false);
//   const [badPassword, setBadPassword] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const dispatch = useDispatch();

//   const submit = async () => {
//     if (!email || !email.includes('@') || !email.includes('.com')) {
//       setBadEmail(true);
//       setBadPassword(true);
//       return;
//     } else setBadEmail(false);

//     if (!password) {
//       setBadPassword(true);
//       return;
//     } else setBadPassword(false);

//     loginUser();
//   };

//   const loginUser = async () => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password,
//       );

//       const user = userCredential.user;

//       //Create Firestore document if not exists
//       const userDocRef = doc(db, 'users', user.uid);
//       const userDocSnap = await getDoc(userDocRef);

//       if (!userDocSnap.exists()) {
//         await setDoc(userDocRef, {
//           email: user.email,
//           createdAt: new Date(),
//         });
//       }

//       const profile = { uid: user.uid, email: user.email };
//       console.log('Console from login:', profile);
//       await AsyncStorage.setItem('loggedInUser', JSON.stringify(profile));

//       // //Load cart
//       // const cartSnap = await getDocs(collection(db, 'users', user.uid, 'cart'));
//       // const cartItems = cartSnap.docs.map(doc => doc.data());
//       // dispatch({ type: 'SET_CART', payload: cartItems });

//       // //Load wishlist
//       // const wishlistSnap = await getDocs(
//       //   collection(db, 'users', user.uid, 'wishlist'),
//       // );
//       // const wishlistItems = wishlistSnap.docs.map(doc => doc.data());
//       // dispatch({ type: 'SET_WISHLIST', payload: wishlistItems });

//       // //Load addresses
//       // const addressesSnap = await getDocs(
//       //   collection(db, 'users', user.uid, 'addresses'),
//       // );
//       // const addresses = addressesSnap.docs.map(doc => doc.data());
//       // dispatch({ type: 'SET_ADDRESS', payload: addresses });

//       navigation.replace('Home');
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     }
//   };

//   return (
//     <>
//       <StatusBar
//         barStyle="dark-content"
//         backgroundColor={'#F7F7F7'}
//         hidden={false} // Ensure it's not hidden
//         translucent={false} // Avoid translucency
//       />
//       <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
//         <KeyboardAvoidingView
//           behavior="padding"
//           keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
//           style={{ flex: 1, justifyContent: 'center' }}
//         >
//           <Image
//             source={require('../assets/playstore.png')}
//             style={{
//               width: 90,
//               height: 90,
//               alignSelf: 'center',
//               borderRadius: 10,
//             }}
//           />

//           <Text
//             style={{
//               alignSelf: 'center',
//               fontSize: 25,
//               fontWeight: '600',
//               marginTop: 20,
//               color: '#000',
//             }}
//           >
//             HOPSHOP!
//           </Text>

//           <CustomTextInput
//             placeholder={'Enter Email...'}
//             value={email}
//             onChangeText={actualData => setemail(actualData)}
//             icon={require('../assets/mail.png')}
//           />

//           {badEmail === true && (
//             <Text
//               style={{
//                 marginTop: 5,
//                 marginLeft: 35,
//                 color: 'red',
//                 fontSize: 12,
//               }}
//             >
//               Please Enter Email ID
//             </Text>
//           )}

//           <CustomTextInput
//             placeholder={'Enter Password...'}
//             value={password}
//             onChangeText={setPassword}
//             icon={require('../assets/padlock.png')}
//             secureTextEntry={!showPassword}
//             rightIcon={
//               !showPassword
//                 ? require('../assets/eye-off.png')
//                 : require('../assets/eye.png')
//             }
//             onRightIconPress={() => setShowPassword(!showPassword)}
//           />

//           {badPassword === true && (
//             <Text
//               style={{
//                 marginTop: 5,
//                 marginLeft: 35,
//                 color: 'red',
//                 fontSize: 12,
//               }}
//             >
//               Please Enter Password!
//             </Text>
//           )}

//           <Text
//             style={{
//               fontSize: 14,
//               fontWeight: '600',
//               alignSelf: 'flex-end',
//               marginTop: 10,
//               marginRight: 30,
//               textDecorationLine: 'underline',
//             }}
//             onPress={() => navigation.navigate('Forget')}
//           >
//             Forgot Password?
//           </Text>

//           <CommonButton
//             title={'Login'}
//             bgcolor={'#000'}
//             textcolor={'#fff'}
//             size={20}
//             thick={'600'}
//             onPress={submit}
//           />

//           <Text
//             style={{
//               fontSize: 18,
//               fontWeight: '600',
//               alignSelf: 'center',
//               marginTop: 20,
//               textDecorationLine: 'underline',
//             }}
//             onPress={() => navigation.navigate('SignUp')}
//           >
//             Create New Account?
//           </Text>
//         </KeyboardAvoidingView>
//       </SafeAreaView>
//     </>
//   );
// };

// export default Login;

import {
  View,
  Text,
  Image,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomTextInput from '../common/CustomTextInput';
import CommonButton from '../common/CommonButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { auth, db } from '../services/firebaseAuth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBiometrics } from '../hooks/useBiometrics';

const Login = ({ navigation }) => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [badEmail, setBadEmail] = useState(false);
  const [badPassword, setBadPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [biometricEnrolled, setBiometricEnrolled] = useState(false);
  const [biometryType, setBiometryType] = useState(null);

  const dispatch = useDispatch();
  const {
    checkBiometricSupport,
    isEnrolled,
    enrollBiometrics,
    loginWithBiometrics,
  } = useBiometrics();

  useEffect(() => {
    (async () => {
      const { available, biometryType: type } = await checkBiometricSupport();
      setBiometricAvailable(available);
      setBiometryType(type);

      if (available) {
        const enrolled = await isEnrolled();
        setBiometricEnrolled(enrolled);
      }
    })();
  }, []);

  const biometricLabel =
    biometryType === 'FaceID'
      ? 'Face ID'
      : biometryType === 'TouchID'
      ? 'Touch ID'
      : 'Biometrics';

  const handleBiometricLogin = async () => {
    const { success, error } = await loginWithBiometrics();
    if (success) {
      navigation.replace('Home');
    } else if (error) {
      Alert.alert('Biometric login failed', error);
    }
  };

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
        password,
      );
      const user = userCredential.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, { email: user.email, createdAt: new Date() });
      }

      const profile = { uid: user.uid, email: user.email };
      await AsyncStorage.setItem('loggedInUser', JSON.stringify(profile));

      // Offer biometric enrollment after first successful password login
      if (biometricAvailable && !biometricEnrolled) {
        Alert.alert(
          `Enable ${biometricLabel}`,
          `Sign in faster with ${biometricLabel}?`,
          [
            {
              text: 'Not now',
              style: 'cancel',
              onPress: () => navigation.replace('Home'),
            },
            {
              text: 'Enable',
              onPress: async () => {
                const { success, error } = await enrollBiometrics(
                  email,
                  password,
                );
                if (!success && error !== 'Cancelled') {
                  Alert.alert('Could not enable biometrics', error);
                }
                navigation.replace('Home');
              },
            },
          ],
        );
      } else {
        navigation.replace('Home');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
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
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
          style={{ flex: 1, justifyContent: 'center' }}
        >
          <Image
            source={require('../assets/playstore.png')}
            style={{
              width: 90,
              height: 90,
              alignSelf: 'center',
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
            onChangeText={setemail}
            icon={require('../assets/mail.png')}
          />
          {badEmail && (
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
          {badPassword && (
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

          {/* <CommonButton
            title={'Login'}
            bgcolor={'#000'}
            textcolor={'#fff'}
            size={20}
            thick={'600'}
            onPress={submit}
          /> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              padding: 20,
            }}
          >
            <TouchableOpacity
              onPress={submit}
              style={{
                borderWidth: 1,
                borderRadius: 10,
                paddingVertical: 10,
                paddingHorizontal: 30,
                backgroundColor: '#000',
              }}
            >
              <Text
                style={{ fontSize: 14, fontWeight: '600', color: '#ffffff' }}
              >
                Log In
              </Text>
            </TouchableOpacity>

            {/* Biometric login button — shown if enrolled */}
            {biometricAvailable && biometricEnrolled && (
              <TouchableOpacity
                onPress={handleBiometricLogin}
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingVertical: 10,
                  paddingHorizontal: 30,
                  backgroundColor: '#000',
                }}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: '600', color: '#f7f7f7' }}
                >
                  LogIn with {biometricLabel}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              alignSelf: 'center',
              marginTop: 10,
              textDecorationLine: 'underline',
            }}
            onPress={() => navigation.navigate('SignUp')}
          >
            Create New Account?
          </Text>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default Login;

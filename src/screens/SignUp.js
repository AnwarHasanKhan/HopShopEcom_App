import { View, Text, Image, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import CustomTextInput from '../common/CustomTextInput';
import CommonButton from '../common/CommonButton';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import firebaseConfig from '../services/firebaseConfig';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const SignUp = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [badUserName, setBadUserName] = useState(false);
  const [badEmail, setBadEmail] = useState(false);
  const [badMobile, setBadMobile] = useState(false);
  const [badPassword, setBadPassword] = useState(false);
  const [badConfirmPassword, setBadConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const phoneRegex = /^\+?\d{10,15}$/;

  const validation = () => {
    let isValid = true;

    if (userName === '') {
      setBadUserName(true);
      isValid = false;
    } else {
      setBadUserName(false);
    }
    if (email === '' || !email.includes('@') || !email.includes('.com')) {
      setBadEmail(true);
      isValid = false;
    } else {
      setBadEmail(false);
    }
    if (!phoneRegex.test(mobile)) {
      setBadMobile(true);
      isValid = false;
    } else {
      setBadMobile(false);
    }
    if (password === '' || password.length < 6) {
      setBadPassword(true);
      isValid = false;
    } else {
      setBadPassword(false);
    }
    if (confirmPassword === '' || confirmPassword !== password) {
      setBadConfirmPassword(true);
      isValid = false;
    } else {
      setBadConfirmPassword(false);
    }

    if (!isValid) return;

    registerUser();
  };

  const registerUser = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        name: userName,
        email: email,
        mobile: mobile,
        createdAt: new Date(),
      });

      Alert.alert('Success', `Account Created: ${user.email}`);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <Image
          source={require('../assets/playstore.png')}
          style={{
            width: 100,
            height: 100,
            alignSelf: 'center',
            marginTop: 180,
            borderRadius: 20,
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
          Create Account
        </Text>

        <CustomTextInput
          placeholder={'Enter Name...'}
          value={userName}
          onChangeText={setUserName}
          icon={require('../assets/user.png')}
        />
        {badUserName && (
          <Text style={{ marginLeft: 35, color: 'red', fontSize: 12 }}>
            Please Enter Username!
          </Text>
        )}

        <CustomTextInput
          placeholder={'Enter Email...'}
          value={email}
          onChangeText={setEmail}
          icon={require('../assets/mail.png')}
        />
        {badEmail && (
          <Text style={{ marginLeft: 35, color: 'red', fontSize: 12 }}>
            Please Enter a Valid Email
          </Text>
        )}

        <CustomTextInput
          placeholder={'Enter Mobile...'}
          value={mobile}
          onChangeText={setMobile}
          icon={require('../assets/smartphone.png')}
        />
        {badMobile && (
          <Text style={{ marginLeft: 35, color: 'red', fontSize: 12 }}>
            Please Enter Mobile Number
          </Text>
        )}

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
        {badPassword && (
          <Text style={{ marginLeft: 35, color: 'red', fontSize: 12 }}>
            Password must be at least 6 characters
          </Text>
        )}

        <CustomTextInput
          placeholder={'Confirm Password...'}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          icon={require('../assets/padlock.png')}
          secureTextEntry={!showConfirmPassword}
          rightIcon={
            !showConfirmPassword
              ? require('../assets/eye-off.png')
              : require('../assets/eye.png')
          }
          onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
        />
        {badConfirmPassword && (
          <Text style={{ marginLeft: 35, color: 'red', fontSize: 12 }}>
            Passwords do not match
          </Text>
        )}

        <CommonButton
          title={'SignUp'}
          bgcolor={'#000'}
          textcolor={'#fff'}
          size={20}
          thick={'600'}
          onPress={validation}
        />

        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
            alignSelf: 'center',
            marginTop: 20,
            textDecorationLine: 'underline',
          }}
          onPress={() => navigation.goBack()}
        >
          Already Have an Account?
        </Text>
      </View>
    </ScrollView>
  );
};

export default SignUp;

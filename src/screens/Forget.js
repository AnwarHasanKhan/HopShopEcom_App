import { View, Text, Alert, Animated } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomTextInput from '../common/CustomTextInput';
import CommonButton from '../common/CommonButton';
import auth from '@react-native-firebase/auth';

const Forget = ({ navigation }) => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmation, setConfirmation] = useState(null);
  const [step, setStep] = useState(1);

  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200, // fade-in duration
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, step]); // animate every time step changes

  const sendOTP = async () => {
    if (!mobile) {
      Alert.alert('Error', 'Please enter your mobile number');
      return;
    }

    try {
      const confirmationResult = await auth().signInWithPhoneNumber(mobile);
      setConfirmation(confirmationResult);
      setStep(2);
      Alert.alert('OTP sent', 'Please enter the OTP sent to your mobile.');
    } catch (error) {
      console.log('Error sending OTP:', error);
      Alert.alert('Error', error.message);
    }
  };

  const verifyOTP = async () => {
    if (!otp) {
      Alert.alert('Error', 'Please enter the OTP');
      return;
    }

    try {
      await confirmation.confirm(otp);
      Alert.alert('Success', 'Phone number verified!');
      navigation.navigate('Login');
    } catch (error) {
      console.log('Error verifying OTP:', error);
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Animated.View
        style={{ opacity: fadeAnim, marginBottom: 20, alignItems: 'center' }}
      >
        <Text style={{ fontSize: 18, fontWeight: '600', textAlign: 'center' }}>
          {step === 1
            ? 'Enter your mobile number to receive OTP 🔒'
            : 'Enter the OTP sent to your mobile number'}
        </Text>
      </Animated.View>

      <Animated.View style={{ opacity: fadeAnim, width: '100%' }}>
        {step === 1 ? (
          <CustomTextInput
            placeholder={'Enter Mobile...'}
            icon={require('../assets/mobile-phone.png')}
            value={mobile}
            onChangeText={setMobile}
          />
        ) : (
          <CustomTextInput
            placeholder={'Enter OTP...'}
            icon={require('../assets/mobile-phone.png')}
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            maxLength={6}
          />
        )}

        <CommonButton
          title={step === 1 ? 'Get OTP' : 'Verify OTP'}
          bgcolor={'#000'}
          textcolor={'#fff'}
          size={20}
          thick={'600'}
          onPress={step === 1 ? sendOTP : verifyOTP}
          style={{ marginTop: 20 }}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

export default Forget;

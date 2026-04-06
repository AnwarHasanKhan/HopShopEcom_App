import { useCallback } from 'react';
import ReactNativeBiometrics from 'react-native-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseAuth';

const rnBiometrics = new ReactNativeBiometrics({
  allowDeviceCredentials: true, 
});

const KEYS = {
  ENROLLED: 'biometric_enrolled',
  EMAIL: 'biometric_email',
  PASSWORD: 'biometric_password',
};
console.log("Console from Keys:", KEYS)

export const useBiometrics = () => {

  const checkBiometricSupport = useCallback(async () => {
    try {
      const { available, biometryType } = await rnBiometrics.isSensorAvailable();
      console.log('Console from useBio', biometryType)
      return { available, biometryType };
    } catch {
      return { available: false, biometryType: null };
    }
  }, []);

  const isEnrolled = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem(KEYS.ENROLLED);
      console.log('Console from isEnroll: ', value)
      return value === 'true';
    } catch {
      return false;
    }
  }, []);

  const enrollBiometrics = useCallback(async (email, password) => {
    try {
      const { available } = await rnBiometrics.isSensorAvailable();
      if (!available) return { success: false, error: 'Not available' };

      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: 'Enable biometric or pattern login',
        cancelButtonText: 'Cancel',
      });

      if (!success) return { success: false, error: 'Cancelled' };

      await AsyncStorage.multiSet([
        [KEYS.ENROLLED, 'true'],
        [KEYS.EMAIL, email],
        [KEYS.PASSWORD, password],
      ]);

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, []);

  const loginWithBiometrics = useCallback(async () => {
    try {
      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: 'Sign in to HopShop',
        cancelButtonText: 'Use password',
      });

      if (!success) return { success: false };

      const email = await AsyncStorage.getItem(KEYS.EMAIL);
      const password = await AsyncStorage.getItem(KEYS.PASSWORD);

      if (!email || !password) {
        await clearBiometrics();
        return { success: false, error: 'Saved credentials missing. Please log in with password.' };
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await AsyncStorage.setItem(
        'loggedInUser',
        JSON.stringify({ uid: user.uid, email: user.email })
      );

      return { success: true, user };
    } catch (error) {
      // If Firebase rejects stored credentials (e.g. password changed), clear enrollment
      if (
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/user-not-found' ||
        error.code === 'auth/invalid-credential'
      ) {
        await clearBiometrics();
        return { success: false, error: 'Saved credentials are no longer valid. Please log in with password.' };
      }
      return { success: false, error: error.message };
    }
  }, []);

  const clearBiometrics = useCallback(async () => {
    try {
      await AsyncStorage.multiRemove([KEYS.ENROLLED, KEYS.EMAIL, KEYS.PASSWORD]);
    } catch (error) {
      console.error('clearBiometrics error:', error);
    }
  }, []);

  return {
    checkBiometricSupport,
    isEnrolled,
    enrollBiometrics,
    loginWithBiometrics,
    clearBiometrics,
  };
};
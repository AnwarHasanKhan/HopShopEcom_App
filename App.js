import React, { useEffect } from 'react';
import MainContainer from './src/navigation/MainContainer';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import { Alert } from 'react-native';

const App = () => {
<<<<<<< HEAD
  // useEffect(() => {
  //   enableBiometrics();
  // }, []);

  // const enableBiometrics = () => {
  //   const rnBiometric = new ReactNativeBiometrics();
  //   console.log('rnBio from app:', rnBiometric);
  //   rnBiometric
  //   .isSensorAvailable()
  //   .then(({ available, biometryType }) => {
  //     if (available && biometryType === BiometryTypes.TouchID) {
  //       Alert.alert('TouchID');
  //     }
  //   });
  // };
  return (
  <MainContainer/>
  );
=======
  useEffect(() => {
    enableBiometrics();
  }, []);
  const enableBiometrics = () => {
    const rnBiometric = new ReactNativeBiometrics();
    console.log('rnBio:', rnBiometric)
    rnBiometric.isSensorAvailable().then(({ available, biometryType }) => {
      if (available && biometryType === BiometryTypes.TouchID) {
        Alert.alert('TouchID');
      } 
    });
  };
  return (<MainContainer />);
>>>>>>> parent of adc01e6 (Updated Depedencies)
};

export default App;
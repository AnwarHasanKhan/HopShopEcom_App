import { useEffect, useRef } from 'react';
import { BackHandler, ToastAndroid } from 'react-native';
import { useNavigationState } from '@react-navigation/native';

const useDoubleBackExit = () => {
  const backPressedOnce = useRef(false);
  const timerRef = useRef(null);
  const index = useNavigationState(state => state?.index);

  useEffect(() => {
    const onBackPress = () => {
      // If not on the first screen, let React Navigation handle it
      if (index !== 0) return false;

      if (backPressedOnce.current) {
        BackHandler.exitApp();
        return true;
      }

      backPressedOnce.current = true;
      ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);

      timerRef.current = setTimeout(() => {
        backPressedOnce.current = false;
      }, 2000);

      return true;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => {
      subscription.remove();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index]);
};

export default useDoubleBackExit;
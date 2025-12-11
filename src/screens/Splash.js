import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home')
    }, 2000);
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          source={require('../assets/playstore.png')}
          style={{ height: 120, width: 120, borderRadius: 20 }}
        />
        <Text
          style={{
            fontSize: 40,
            color: 'black',
            fontWeight: 600,
          }}
        >
          HopShop!
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    gap: 8,
  },
});

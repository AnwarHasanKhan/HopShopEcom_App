import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';

const OrderSuccess = () => {
  const navigation = useNavigation();
  const route = useRoute();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home');
      // navigation.goBack();
    }, 2500);
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          gap: 10,
        }}
      >
        <Image
          source={
            route.params.status == 'success'
              ? require('./assets/mark.png')
              : require('./assets/remove.png')
          }
          style={{ width: 100, height: 100 }}
        />
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
          }}
        >
          {route.params.status == 'success'
            ? 'Order Placed!'
            : 'Order Failed!!'}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default OrderSuccess;

import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const OrderEmpty = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          marginTop: 200,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          gap: 20,
        }}
      >
        <Image
          source={require('../assets/delivery-man.png')}
          style={{
            width: 100,
            height: 100,
          }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
          }}
        >
          The Order list is empty..
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default OrderEmpty;

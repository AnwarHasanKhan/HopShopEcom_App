import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CartEmpty = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          marginTop: 100,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          gap: 10,
        }}
      >
        <Image
          source={require('../assets/online-shopping.png')}
          style={{
            width: 150,
            height: 150,
          }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
          }}
        >
          The bags seems empty..
        </Text>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: 15,
            paddingVertical: 6,
            backgroundColor: '#7977a8ff',
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: '#fff',
            }}
          >
            SHOP NOW
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartEmpty;

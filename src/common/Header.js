import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';

const Header = ({onPress}) => {
  return (
    <View>
      <View
        style={{
          width: '100%',
          height: 60,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          borderBottomWidth: 0.2,
          borderBottomColor: '#999ad2ff',
          backgroundColor: '#fff',
          elevation: 3,
        }}
      >
        <Text
          style={{
            fontWeight: '600',
            fontSize: 24,
            color: '#000',
            marginLeft: 20,
            padding: 1,
            fontStyle: 'italic',
          }}
        >
          HopShop!
        </Text>
        <TouchableOpacity
          style={{
            marginRight: '20',
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 30,
          }}
          onPress={() => {
            onPress();
          }}
        >
          <Image
            source={require('../assets/plastic-bag.png')}
            style={{
              width: 40,
              height: 40,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

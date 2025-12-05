import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Wishlist = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          marginTop: 230,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          gap: 12,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
          }}
        >
          Make your wish list!!
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

export default Wishlist;

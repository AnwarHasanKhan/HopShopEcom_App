import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const CommonButton = ({ onPress, title, bgcolor, textcolor, size, thick }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: bgcolor,
        justifyContent: 'center',
        alignItems: 'center',
        width: '85%',
        height: 50,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 30,
      }}
      onPress={() => {
        onPress();
      }}
    >
      <Text
        style={{
          color: textcolor,
          fontSize: size,
          fontWeight: thick,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CommonButton;

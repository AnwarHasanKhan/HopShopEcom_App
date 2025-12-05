import { View, Text, Image, TextInput,TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

const CustomTextInput = ({
  placeholder,
  value,
  onChangeText,
  icon,
  rightIcon,
  onRightIconPress,
  keyboardType,
  secureTextEntry,
}) => {
  return (
    <View style={styles.inputbox}>
      <Image source={icon} style={{ width: 20, height: 20 }} />

      <TextInput
        placeholder={placeholder}
        placeholderTextColor={'grey'}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        style={{ flex: 1 }}
      />

      {rightIcon && (
        <TouchableOpacity onPress={onRightIconPress}>
          <Image source={rightIcon} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  inputbox: {
    width: '85%',
    height: 45,
    borderWidth: 0.5,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    gap: 5,
    overflow: 'hidden',
  },
});

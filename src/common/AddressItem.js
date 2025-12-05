import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const AddressItem = ({ item, onRemoveItem }) => {
  return (
    <View
      style={{
        width: '100%',
        borderWidth: 0.2,
        borderColor: '#8e8e8e',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
      }}
    >
      <View style={{ width: '80%' }}>
        <Text style={{ fontWeight: 'bold' }}>Building: {item.building}</Text>
        <Text style={{ fontWeight: 'bold' }}>City: {item.city}</Text>
        <Text style={{ fontWeight: 'bold' }}>Pincode: {item.pincode}</Text>
      </View>
      <View>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            paddingHorizontal: 14,
            borderRadius: 10,
            paddingVertical: 5,
          }}
          onPress={() => {
            onRemoveItem();
          }}
        >
          <Text style={{ fontWeight: '500', fontSize: 12 }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddressItem;

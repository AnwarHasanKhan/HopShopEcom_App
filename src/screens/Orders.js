import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder } from '../redux/actions/Actions';
import OrderEmpty from '../common/OrderEmpty';
import { useNavigation } from '@react-navigation/native';

const Orders = () => {
  const navigation = useNavigation();
  const orders = useSelector(state => state.OrderReducer);
  const dispatch = useDispatch();

  const usdToInr = 89.81;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          width: '100%',
          height: 50,
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomWidth: 0.5,
        }}
      >
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            source={require('../assets/back.png')}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>My Orders</Text>
      </View>
      {orders.length > 0 ? (
        <FlatList
          data={orders}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.card}>
              <View style={{ width: '80%' }}>
                <Text style={{ fontWeight: 'bold' }}>
                  Order Value: ₹{Math.round(item.total)}
                </Text>
                <Text style={{ marginBottom: 5 }}>{item.address}</Text>

                {item.item?.map((product, idx) => (
                  <View
                    key={idx}
                    style={{
                      flexDirection: 'row',
                      marginBottom: 10,
                    }}
                  >
                    <Image
                      source={{
                        uri: product.image ? product.image : product.images[0],
                      }}
                      style={{
                        width: 50,
                        height: 50,
                        marginRight: 10,
                        borderRadius: 5,
                      }}
                    />
                    <View>
                      {product.name ? (
                        <Text style={{ fontSize: 14, fontWeight: '600' }}>
                          {product.name}
                        </Text>
                      ) : (
                        <Text style={{ fontSize: 14, fontWeight: '600' }}>
                          {product.title}
                        </Text>
                      )}
                      <Text>₹{Math.round(usdToInr * product.price)}</Text>
                    </View>
                  </View>
                ))}
              </View>
              <View
                style={{
                  top: 10,
                  right: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    paddingHorizontal: 14,
                    borderRadius: 10,
                    paddingVertical: 5,
                  }}
                  onPress={() => {
                    dispatch(deleteOrder(index));
                  }}
                >
                  <Text style={{ fontWeight: '500', fontSize: 12 }}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ) : (
        <OrderEmpty />
      )}
    </SafeAreaView>
  );
};

export default Orders;

const styles = StyleSheet.create({
  card: {
    margin: 5,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '98%',
    borderRadius: 20,
    elevation: 4,
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
});

import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');

  useEffect(() => {
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem('loggedInUser');
      if (userData) {
        const user = JSON.parse(userData);
        setUsername(user.Name);
        setMobile(user.Mobile);
      }
    };
    loadUser();
  }, []);
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
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Profile</Text>
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={require('../assets/setting.png')}
            style={{ width: 23, height: 23 }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          margin: 10,
          marginTop: 20,
          gap: 20,
        }}
      >
        <Image
          source={require('../assets/user.png')}
          style={{
            width: 80,
            height: 80,
            borderRadius: 50,
          }}
        />
        <View
          style={{
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
            }}
          >
            Hello, {username}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
            }}
          >
            +91 {mobile}
          </Text>
        </View>
      </View>
      <View style={{ marginLeft: 10 }}>
        <TouchableOpacity
          style={styles.list}
          onPress={() => {
            navigation.navigate('Orders');
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginRight: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
              }}
            >
              My Orders
            </Text>
            <Image
              source={require('../assets/next.png')}
              style={{
                width: 24,
                height: 24,
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.list}
        onPress={() => {
            navigation.navigate('MyWishlist');
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginRight: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
              }}
            >
              My Wishlist
            </Text>
            <Image
              source={require('../assets/next.png')}
              style={{
                width: 24,
                height: 24,
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.list}
          onPress={() => {
            navigation.navigate('MyAddress');
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginRight: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
              }}
            >
              My Addresses
            </Text>
            <Image
              source={require('../assets/next.png')}
              style={{
                width: 24,
                height: 24,
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.list}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginRight: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
              }}
            >
              Manage account
            </Text>
            <Image
              source={require('../assets/next.png')}
              style={{
                width: 24,
                height: 24,
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.list}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginRight: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
              }}
            >
              Settings
            </Text>
            <Image
              source={require('../assets/next.png')}
              style={{
                width: 24,
                height: 24,
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginBottom: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 30,
            marginTop: 200,
            backgroundColor: '#000000ff',
          }}
          onPress={() => {
            navigation.navigate('Login');
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: '#fffafaff',
            }}
          >
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  list: {
    borderBottomWidth: 0.5,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    paddingLeft: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

// import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Profile = () => {
//   const navigation = useNavigation();
//   const [username, setUsername] = useState('');
//   const [mobile, setMobile] = useState('');

//   useEffect(() => {
//     const loadUser = async () => {
//       const userData = await AsyncStorage.getItem('loggedInUser');
//       if (userData) {
//         const user = JSON.parse(userData);
//         setUsername(user.Name);
//         setMobile(user.Mobile);
//       }
//     };
//     loadUser();
//   }, []);
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View
//         style={{
//           width: '100%',
//           height: 50,
//           padding: 10,
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           borderBottomWidth: 0.5,
//         }}
//       >
//         <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Profile</Text>
//         <TouchableOpacity
//           style={{
//             width: 30,
//             height: 30,
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <Image
//             source={require('../assets/setting.png')}
//             style={{ width: 23, height: 23 }}
//           />
//         </TouchableOpacity>
//       </View>
//       <View
//         style={{
//           flexDirection: 'row',
//           margin: 10,
//           marginTop: 20,
//           gap: 20,
//         }}
//       >
//         <Image
//           source={require('../assets/user.png')}
//           style={{
//             width: 80,
//             height: 80,
//             borderRadius: 50,
//           }}
//         />
//         <View
//           style={{
//             marginTop: 10,
//           }}
//         >
//           <Text
//             style={{
//               fontSize: 20,
//               fontWeight: '600',
//             }}
//           >
//             Hello, {username}
//           </Text>
//           <Text
//             style={{
//               fontSize: 14,
//               fontWeight: '400',
//             }}
//           >
//             +91 {mobile}
//           </Text>
//         </View>
//       </View>
//       <View style={{ marginLeft: 10 }}>
//         <TouchableOpacity
//           style={styles.list}
//           onPress={() => {
//             navigation.navigate('Orders');
//           }}
//         >
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               marginRight: 10,
//             }}
//           >
//             <Text
//               style={{
//                 fontSize: 16,
//                 fontWeight: '500',
//               }}
//             >
//               My Orders
//             </Text>
//             <Image
//               source={require('../assets/next.png')}
//               style={{
//                 width: 24,
//                 height: 24,
//               }}
//             />
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.list}
//         onPress={() => {
//             navigation.navigate('MyWishlist');
//           }}>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               marginRight: 10,
//             }}
//           >
//             <Text
//               style={{
//                 fontSize: 16,
//                 fontWeight: '500',
//               }}
//             >
//               My Wishlist
//             </Text>
//             <Image
//               source={require('../assets/next.png')}
//               style={{
//                 width: 24,
//                 height: 24,
//               }}
//             />
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.list}
//           onPress={() => {
//             navigation.navigate('MyAddress');
//           }}
//         >
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               marginRight: 10,
//             }}
//           >
//             <Text
//               style={{
//                 fontSize: 16,
//                 fontWeight: '500',
//               }}
//             >
//               My Addresses
//             </Text>
//             <Image
//               source={require('../assets/next.png')}
//               style={{
//                 width: 24,
//                 height: 24,
//               }}
//             />
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.list}>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               marginRight: 10,
//             }}
//           >
//             <Text
//               style={{
//                 fontSize: 16,
//                 fontWeight: '500',
//               }}
//             >
//               Manage account
//             </Text>
//             <Image
//               source={require('../assets/next.png')}
//               style={{
//                 width: 24,
//                 height: 24,
//               }}
//             />
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.list}>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               marginRight: 10,
//             }}
//           >
//             <Text
//               style={{
//                 fontSize: 16,
//                 fontWeight: '500',
//               }}
//             >
//               Settings
//             </Text>
//             <Image
//               source={require('../assets/next.png')}
//               style={{
//                 width: 24,
//                 height: 24,
//               }}
//             />
//           </View>
//         </TouchableOpacity>
//       </View>
//       <View
//         style={{
//           marginBottom: 10,
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <TouchableOpacity
//           style={{
//             borderWidth: 1,
//             borderRadius: 10,
//             paddingVertical: 10,
//             paddingHorizontal: 30,
//             marginTop: 200,
//             backgroundColor: '#000000ff',
//           }}
//           onPress={() => {
//             navigation.navigate('Login');
//           }}
//         >
//           <Text
//             style={{
//               fontSize: 20,
//               fontWeight: '700',
//               color: '#fffafaff',
//             }}
//           >
//             Log Out
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Profile;

// const styles = StyleSheet.create({
//   list: {
//     borderBottomWidth: 0.5,
//     width: '100%',
//     height: 50,
//     justifyContent: 'center',
//     paddingLeft: 15,
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//   },
// });

import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../services/firebaseConfig';
import { useDispatch } from 'react-redux';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const Profile = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        navigation.navigate('Login');
        return;
      }

      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const profile = docSnap.data();
        setUsername(profile.name);
        setMobile(profile.mobile);
        setEmail(profile.email);

        await AsyncStorage.setItem('loggedInUser', JSON.stringify(profile));
      }
    } catch (error) {
      console.log('Error loading profile:', error);
    }
  };

  const logoutUser = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.clear();
      dispatch({ type: 'CLEAR_CART' });
      dispatch({ type: 'CLEAR_WISHLIST' });
      dispatch({ type: 'CLEAR_ADDRESS' });
      dispatch({ type: 'CLEAR_ORDER' });
      await AsyncStorage.removeItem('loggedInUser');

      navigation.navigate('Login');
    } catch (error) {
      console.log('Logout Error:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
        <TouchableOpacity style={styles.settingsBtn}>
          <Image
            source={require('../assets/setting.png')}
            style={styles.settingsIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={require('../assets/user.png')}
          style={styles.profileImage}
        />
        <View style={{ marginTop: 5 }}>
          <Text style={styles.nameText}>Hello, {username}</Text>
          <Text style={styles.mobileText}>+91 {mobile}</Text>
          <Text style={styles.emailText}>{email}</Text>
        </View>
      </View>

      {/* List Items */}
      <View style={{ marginLeft: 10 }}>
        <TouchableOpacity
          style={styles.list}
          onPress={() => navigation.navigate('Orders')}
        >
          <ListItem label="My Orders" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.list}
          onPress={() => navigation.navigate('MyWishlist')}
        >
          <ListItem label="My Wishlist" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.list}
          onPress={() => navigation.navigate('MyAddress')}
        >
          <ListItem label="My Addresses" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.list}>
          <ListItem label="Manage Account" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.list}>
          <ListItem label="Settings" />
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutBtn} onPress={logoutUser}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const ListItem = ({ label }) => (
  <View style={styles.listRow}>
    <Text style={styles.listLabel}>{label}</Text>
    <Image source={require('../assets/next.png')} style={styles.nextIcon} />
  </View>
);

export default Profile;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 50,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  settingsBtn: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    width: 23,
    height: 23,
  },
  profileContainer: {
    flexDirection: 'row',
    margin: 10,
    marginTop: 20,
    gap: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  nameText: {
    fontSize: 20,
    fontWeight: '600',
  },
  mobileText: {
    fontSize: 14,
    fontWeight: '400',
  },
  emailText: {
    fontSize: 14,
    color: '#333',
  },
  list: {
    borderBottomWidth: 0.5,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    paddingLeft: 15,
    borderRadius: 10,
  },
  listRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 10,
  },
  listLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  nextIcon: {
    width: 24,
    height: 24,
  },
  logoutContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoutBtn: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 200,
    backgroundColor: '#000',
  },
  logoutText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
});

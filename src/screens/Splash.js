import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home')
    }, 2000);
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          source={require('../assets/playstore.png')}
          style={{ height: 120, width: 120, borderRadius: 20 }}
        />
        <Text
          style={{
            fontSize: 40,
            color: 'black',
            fontWeight: 600,
          }}
        >
          HopShop!
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    gap: 8,
  },
});



// import { View, Text, StyleSheet, Image, Animated } from 'react-native';
// import React, { useEffect, useRef } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const Splash = () => {
//   const navigation = useNavigation();

//   // Animation value (opacity starts from 0)
//   const fadeAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     // Fade in animation
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 1200,
//       useNativeDriver: true,
//     }).start();

//     // Navigate after 2 seconds
//     const timer = setTimeout(() => {
//       navigation.navigate('Login');
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <SafeAreaView>
//       <View style={styles.container}>
//         {/* Fade Animation wrapper */}
//         <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
//           <Image
//             source={require('../assets/playstore.png')}
//             style={{ height: 120, width: 120, borderRadius: 20 }}
//           />
//           <Text style={styles.title}>HopShop!</Text>
//         </Animated.View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Splash;

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100%',
//     gap: 8,
//   },
//   title: {
//     fontSize: 40,
//     color: 'black',
//     fontWeight: '600',
//     marginTop: 10,
//   },
// });

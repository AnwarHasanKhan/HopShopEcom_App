import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Switch,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebaseAuth';
import { useBiometrics } from '../hooks/useBiometrics';

const Settings = ({ navigation }) => {
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [biometricEnrolled, setBiometricEnrolled] = useState(false);
  const [biometryType, setBiometryType] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    checkBiometricSupport,
    isEnrolled,
    enrollBiometrics,
    clearBiometrics,
  } = useBiometrics();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const { available, biometryType: type } = await checkBiometricSupport();
    setBiometricAvailable(available);
    setBiometryType(type);
    if (available) {
      const enrolled = await isEnrolled();
      setBiometricEnrolled(enrolled);
    }
  };

  const biometricLabel =
    biometryType === 'FaceID'
      ? 'Face ID'
      : biometryType === 'TouchID'
      ? 'Touch ID'
      : 'Biometrics / Pattern';

  const handleBiometricToggle = async value => {
    if (value) {
      // Enabling — need stored credentials
      // Prompt user for password to re-enroll
      Alert.prompt(
        `Enable ${biometricLabel}`,
        'Enter your password to enable biometric login',
        async enteredPassword => {
          if (!enteredPassword) return;
          setLoading(true);

          const storedUser = await AsyncStorage.getItem('loggedInUser');
          const { email } = JSON.parse(storedUser);

          const { success, error } = await enrollBiometrics(
            email,
            enteredPassword,
          );
          setLoading(false);

          if (success) {
            setBiometricEnrolled(true);
            Alert.alert('Done', `${biometricLabel} login enabled.`);
          } else if (error !== 'Cancelled') {
            Alert.alert('Failed', error);
          }
        },
        'secure-text',
      );
    } else {
      // Disabling
      Alert.alert(
        `Disable ${biometricLabel}`,
        'Are you sure you want to disable biometric login?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Disable',
            style: 'destructive',
            onPress: async () => {
              await clearBiometrics();
              setBiometricEnrolled(false);
            },
          },
        ],
      );
    }
  };

  const handleLogout = async () => {
    Alert.alert('Log out', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log out',
        style: 'destructive',
        onPress: async () => {
          await signOut(auth);
          await AsyncStorage.removeItem('loggedInUser');
          await AsyncStorage.clear();
          navigation.replace('Login');
        },
      },
    ]);
  };

  return (
    <>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={'#F7F7F7'}
            hidden={false}
            translucent={false}
          />
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Settings</Text>

        {/* Biometric section */}
        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>

          {biometricAvailable ? (
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <Text style={styles.rowTitle}>{biometricLabel}</Text>
                <Text style={styles.rowSubtitle}>
                  {biometricEnrolled
                    ? 'Enabled — tap to disable'
                    : 'Disabled — tap to enable'}
                </Text>
              </View>
              {loading ? (
                <ActivityIndicator color="#000" />
              ) : (
                <Switch
                  value={biometricEnrolled}
                  onValueChange={handleBiometricToggle}
                  trackColor={{ false: '#ccc', true: '#000' }}
                  thumbColor="#fff"
                />
              )}
            </View>
          ) : (
            <View style={styles.row}>
              <Text style={styles.rowSubtitle}>
                Biometrics not available on this device
              </Text>
            </View>
          )}
        </View> */}

        {/* Account section */}
        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View> */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 20 },
  heading: { fontSize: 28, fontWeight: '700', color: '#000', marginBottom: 32 },
  section: {
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 16,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#888',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
    backgroundColor: '#f9f9f9',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  rowLeft: { flex: 1, marginRight: 12 },
  rowTitle: { fontSize: 16, fontWeight: '500', color: '#000' },
  rowSubtitle: { fontSize: 13, color: '#888', marginTop: 2 },
  logoutContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#000',
  },
  logoutBtn: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#000',
  },
  logoutText: { fontSize: 20, fontWeight: '700', color: '#fff' },
});

export default Settings;

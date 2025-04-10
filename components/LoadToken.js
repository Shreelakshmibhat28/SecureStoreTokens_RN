import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';

export default function LoadToken() {
  const [customId, setCustomId] = useState('');
  const [message, setMessage] = useState('');

  const authenticateUser = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      Alert.alert('Error', 'Biometric authentication is not supported on this device.');
      return false;
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      Alert.alert('Error', 'No biometric authentication methods are enrolled.');
      return false;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate to load token',
    });

    return result.success;
  };

  const loadToken = async () => {
    if (!customId.trim()) {
      setMessage('Please enter an ID to load token.');
      return;
    }

    const isAuthenticated = await authenticateUser();
    if (!isAuthenticated) {
      setMessage('Authentication failed. Cannot load token.');
      return;
    }

    const token = await SecureStore.getItemAsync(customId);
    if (token) {
      console.log(`Token retrieved for ID "${customId}":`, token);
      setMessage(`Token for ID "${customId}": ${token}`);
    } else {
      console.log(`No token found for ID "${customId}".`);
      setMessage('Token is not available.');
    }
  };

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Load Token</Text>
      <TextInput
        placeholder="Enter ID"
        value={customId}
        onChangeText={setCustomId}
        style={styles.input}
      />
      <Button title="Load Token" onPress={loadToken} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 40,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  message: {
    marginTop: 10,
    color: 'blue',
  },
});

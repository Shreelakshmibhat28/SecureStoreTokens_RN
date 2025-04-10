import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default function LoadToken() {
  const [customId, setCustomId] = useState('');
  const [message, setMessage] = useState('');

  const loadToken = async () => {
    if (!customId.trim()) {
      setMessage('Please enter an ID to load token.');
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

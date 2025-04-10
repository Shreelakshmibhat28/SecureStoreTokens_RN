import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { v4 as uuidv4 } from 'uuid';

export default function GenerateToken() {
  const [customId, setCustomId] = useState('');
  const [message, setMessage] = useState('');

  const generateAndStoreToken = async () => {
    if (!customId.trim()) {
      setMessage('Please enter a valid ID.');
      return;
    }
  
    try {
      const newToken = uuidv4();
      await SecureStore.setItemAsync(customId, newToken);
      console.log(`Token stored for ID "${customId}":`, newToken);
      setMessage(`Token successfully generated for ID "${customId}".`);
    } catch (error) {
      console.error('Error storing token:', error);
      setMessage('Failed to generate token.');
    }
  };
  
  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Generate & Store Token</Text>
      <TextInput
        placeholder="Enter ID"
        value={customId}
        onChangeText={setCustomId}
        style={styles.input}
      />
      <Button title="Generate Token" onPress={generateAndStoreToken} />
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
    color: 'green',
  },
});

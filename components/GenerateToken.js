import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export default function GenerateToken() {
  const [customId, setCustomId] = useState('');
  const [generatedToken, setGeneratedToken] = useState(null);
  const [message, setMessage] = useState('');

  const generateAndStoreToken = async () => {
    if (!customId.trim()) {
      setMessage('Please enter a valid ID.');
      return;
    }

    try {
      const newToken = uuidv4();
      await SecureStore.setItemAsync(customId, newToken);
      setGeneratedToken(newToken);
      console.log(`Token stored for ID "${customId}":`, newToken);
      setMessage(`Token successfully stored for ID "${customId}".`);
    } catch (error) {
      console.error('Error generating or storing token:', error);
      setMessage('Failed to generate/store token.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generate & Store Token</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Custom ID"
        value={customId}
        onChangeText={setCustomId}
      />
      <Button title="Generate & Store Token" onPress={generateAndStoreToken} />
      {generatedToken && (
        <Text style={styles.tokenText}>Last Generated Token: {generatedToken}</Text>
      )}
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: '#ccc',
  },
  tokenText: {
    marginTop: 10,
    color: 'green',
    fontSize: 14,
  },
  message: {
    marginTop: 10,
    color: 'blue',
  },
});

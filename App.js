import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export default function App() {
  const [customId, setCustomId] = useState('');
  const [generatedToken, setGeneratedToken] = useState(null);

  const generateAndStoreToken = async () => {
    if (!customId.trim()) {
      console.log('Please enter a valid ID.');
      return;
    }
    const newToken = uuidv4();
    await SecureStore.setItemAsync(customId, newToken);
    setGeneratedToken(newToken);
    console.log(`Token stored for ID "${customId}":`, newToken);
  };

  const loadToken = async () => {
    if (!customId.trim()) {
      console.log('Please enter a valid ID to load token.');
      return;
    }
    const token = await SecureStore.getItemAsync(customId);
    if (token) {
      console.log(`Token retrieved for ID "${customId}":`, token);
    } else {
      console.log(`No token found for ID "${customId}".`);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter your custom ID"
        value={customId}
        onChangeText={setCustomId}
        style={styles.input}
      />
      <Button title="Generate & Store Token" onPress={generateAndStoreToken} />
      <Button title="Load Token" onPress={loadToken} />
      {generatedToken && (
        <Text style={styles.tokenText}>Last Generated Token: {generatedToken}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  tokenText: {
    marginTop: 20,
    fontSize: 16,
    color: 'green',
  },
});

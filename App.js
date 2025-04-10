import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export default function App() {
  const [token, setToken] = useState(null);

  const generateAndStoreToken = async () => {
    const newToken = uuidv4(); // Simulates token generation
    await SecureStore.setItemAsync('userToken', newToken);
    setToken(newToken);
  };

  const loadToken = async () => {
    const storedToken = await SecureStore.getItemAsync('userToken');
    //setToken(storedToken);
    console.log('Generated Token: ', storedToken);
  };

  return (
    <View style={styles.container}>
      <Button title="Generate & Store Token" onPress={generateAndStoreToken} />
      <Button title="Load Token" onPress={loadToken} />
      {token && <Text style={styles.tokenText}>Token: {token}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  tokenText: {
    marginTop: 20,
    fontSize: 16,
    color: 'blue',
  },
});

import React from 'react';
import { View, StyleSheet } from 'react-native';
import GenerateToken from './components/GenerateToken';
import LoadToken from './components/LoadToken';

export default function App() {
  return (
    <View style={styles.container}>
      <GenerateToken />
      <LoadToken />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});

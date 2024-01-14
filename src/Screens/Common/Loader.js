import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Loader = () => (
  <View style={styles.loaderContainer}>
    <ActivityIndicator size="large" color="#4CAF50" />
  </View>
);

const styles = StyleSheet.create({
  loaderContainer: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;

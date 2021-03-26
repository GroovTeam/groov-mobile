import React from 'react';
import { View, StyleSheet } from 'react-native';

const DevStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  button: {
    margin: 10,
  },
});

/**
 * Holds a suite of buttons to test various development tools
 */
const DevTools = () => {

  return (
    <View style={DevStyles.container}>
    </View>
  );
};

export default DevTools;
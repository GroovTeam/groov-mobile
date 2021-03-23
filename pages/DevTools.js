import React from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { Button } from 'react-native-material-ui';
import { recoverSession } from '../components/LoginUtils';

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
const DevTools = ({ navigation, deleteSession }) => {

  const deleteAndReset = () => {
    deleteSession();
    navigation.navigate('Main', {
      resetSession: true,
    });
  };

  const showSession = () => {
    recoverSession()
      .then(session => {
        Alert.alert(
          'Session Key:',
          session,
        );
      });
  };

  return (
    <View style={DevStyles.container}>
      <View style={DevStyles.button}>
        <Button
          style={DevStyles.button}
          raised
          primary
          text='Delete Session'
          onPress={deleteAndReset}
        />
      </View>
      <View style={DevStyles.button}>
        <Button
          style={DevStyles.button}
          raised
          primary
          text='Recover Session'
          onPress={showSession}
        />
      </View>
    </View>
  );
};

export default DevTools;
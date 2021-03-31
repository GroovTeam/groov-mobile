import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-material-ui';
import register from '../utils/register';
import firebase from '../utils/Firebase';

const DevStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexGrow: 1,
  },
  button: {
    margin: 10,
  },
});

/**
 * Holds a suite of buttons to test various development tools
 */
const DevTools = ({ navigation }) => {

  const devLogin = () => {
    const devData = {
      email: 'dev@dev.com',
      username: 'dev',
      password: 'admin1234',
      firstName: 'dev',
      lastName: 'deverson',
    };

    register(devData.email,
      devData.password,
      devData.username,
      devData.firstName,
      devData.lastName)
      .then(response => {
        console.log(response);
        navigation.navigate('Main');
      })
      .catch(err => {
        console.error(err);
      });
  };

  const getAuthToken = () => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(token => {
      console.log(token);
      Alert.alert(
        'Token',
        'Token logged to console'
      );
    });
  };

  return (
    <View style={DevStyles.container}>
      <Button
        primary
        raised
        text='Developer Login'
        onPress={devLogin}
      />
      <Button
        primary
        raised
        text='Get Auth Token'
        onPress={getAuthToken}
      />
    </View>
  );
};

export default DevTools;
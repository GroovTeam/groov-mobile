import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-material-ui';
import login from '../utils/login';
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
      email: 'tylerhm.dev@gmail.com',
      password: 'admin1234',
    };

    login(
      devData.email,
      devData.password,
    )
      .then(() => {
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
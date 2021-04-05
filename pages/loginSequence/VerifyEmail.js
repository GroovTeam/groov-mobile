import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-material-ui';
import Styles from '../../components/Styles';
import firebase from '../../utils/Firebase';
import logout from '../../utils/logout';

/**
 * Tell a user that they must verify their email.
 * 
 * @param {Callback} setEmailVerified tells the parent function that an email has been verified
 */
const VerifyEmail = ({ setEmailVerified }) => {

  // Constantly poll the current verification state from the user.
  useEffect(() => {
    const refresher = setInterval(() => {
      firebase.auth().currentUser.reload();
      if (firebase.auth().currentUser.emailVerified)
        setEmailVerified(true);
    }, 1000);
    return () => clearInterval(refresher);
  }, []);

  const logoutUser = async () => {
    logout();
  };

  return (
    <View style={Styles.container}>
      <Text style={[Styles.text, Styles.headerText]}>
        Hey there, please&nbsp;
        <Text style={Styles.blueAccentText}>
          verify&nbsp;
        </Text>
        your email at
      </Text>
      <Text style={[{marginTop: 75}, Styles.text, Styles.blueAccentText]}>
        {firebase.auth().currentUser.email}
      </Text>
      <View style={{marginTop: 25}}/>
      <Button
        raised
        primary
        text='Logout'
        onPress={logoutUser}
      />
    </View>
  );
};
 
export default VerifyEmail;
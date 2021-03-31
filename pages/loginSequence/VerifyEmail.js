import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import Styles from '../../components/Styles';
import firebase from '../../utils/Firebase';

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
    </View>
  );
};
 
export default VerifyEmail;
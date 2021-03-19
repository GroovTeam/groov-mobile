import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Styles from '../components/Styles';
import InputStyles from '../components/InputStyles';
import SwipeConfig from '../components/SwipeConfig';

/**
 * Greets the user in registration.
 * 
 * @param {Route} route
 * @param {Navigator} navigation 
 */
const Email = ({ route, navigation }) => {
  // Email and Password are stateful
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Proceed to the next step in registration.
  const proceed = () => {
    // Create profileData to be passed along.
    const profileData = route.params.profileData;

    if (email == '' || password == '') return;

    profileData.email = email;
    profileData.password = password;

    // Navigate with new items.
    navigation.navigate('Like', {
      profileData: profileData,
    });
  };

  return (
    <GestureRecognizer
      onSwipeLeft={proceed}
      onSwipeRight={() => navigation.navigate('Handle')}
      config={SwipeConfig}
      style={Styles.container}
    >
      <Text style={[Styles.text, Styles.headerText]}>
        How do you want to&nbsp;
        <Text style={Styles.blueAccentText}>
        login?
        </Text>
      </Text>
      <View style={{marginTop: 15}} />
      <TextInput 
        style={InputStyles.textInput}
        placeholder='wevibe@gmail.com'
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        secureTextEntry={true}
        style={InputStyles.textInput}
        placeholder={'password'}
        onChangeText={text => setPassword(text)}
      />
    </GestureRecognizer>
  );
};
 
export default Email;
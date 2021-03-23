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
const Email = ({ route, navigation, userData, applyUserData, updateCurPage }) => {
  // Email and Password are stateful
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Proceed to the next step in registration.
  const proceed = () => {
    // Don't allow the user to continue if empty fields.
    if (email == '' || password == '')
      return;

    // Grab and update the data.
    const profileData = userData;
    
    profileData.email = email;
    profileData.password = password;

    // Apply the new changes.
    applyUserData(profileData);

    // Update current page, and navigate.
    updateCurPage(route.params.pageIndex + 1);
    navigation.navigate('Likes', {
      pageIndex: route.params.pageIndex + 1,
    });
  };

  // Return to the previous step in registration.
  const backtrack = () => {
    // Update current page, and navigate.
    updateCurPage(route.params.pageIndex - 1);
    navigation.navigate('Username', {
      pageIndex: route.params.pageIndex - 1,
    });
  };

  return (
    <GestureRecognizer
      onSwipeLeft={proceed}
      onSwipeRight={backtrack}
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
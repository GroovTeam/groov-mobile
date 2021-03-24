import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Styles from '../../components/Styles';
import InputStyles from '../../components/InputStyles';
import SwipeConfig from '../../utils/SwipeConfig';

/**
 * Greets the user in registration.
 * 
 * @param {Route} route
 * @param {Navigator} navigation 
 */
const Handle = ({ route, navigation, userData, applyUserData, updateCurPage }) => {
  // Names are stateful
  const [username, setUsername] = useState('');

  const updateHandle = (text) => {
    let usernameMinusAt = text;
    if (text.charAt(0) == '@')
      usernameMinusAt = usernameMinusAt.substr(1);
    setUsername(usernameMinusAt);
  };

  // Proceed to the next step in registration.
  const proceed = () => {
    // Don't allow the user to continue if empty fields.
    if (username == '')
      return;

    // Grab and update the data.
    const profileData = userData;
    
    profileData.username = username;

    // Apply the new changes.
    applyUserData(profileData);

    // Update current page, and navigate.
    updateCurPage(route.params.pageIndex + 1);
    navigation.navigate('Email', {
      pageIndex: route.params.pageIndex + 1,
    });
  };

  // Return to the previous step in registration.
  const backtrack = () => {
    // Update current page, and navigate.
    updateCurPage(route.params.pageIndex - 1);
    navigation.navigate('Name', {
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
        What should we&nbsp;
        <Text style={Styles.blueAccentText}>
        call&nbsp;
        </Text>
        you?
      </Text>
      <View style={{marginTop: 15}}/>
      <TextInput 
        style={InputStyles.textInput}
        placeholder={'@handle'}
        onChangeText={text => updateHandle(text)}
        value={username !== '' ? '@' + username : null}
      />
    </GestureRecognizer>
  );
};
 
export default Handle;
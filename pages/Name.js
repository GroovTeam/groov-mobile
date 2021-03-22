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
 * @param {Object} userData
 * @param {Callback} applyUserData
 * @param {Callback} updateCurPage
 */
const Name = ({ route, navigation, userData, applyUserData, updateCurPage }) => {
  // Names are stateful
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // Proceed to the next step in registration.
  const proceed = () => {
    // Don't allow the user to continue if empty fields.
    if (firstName == '' || lastName == '')
      return;

    // Grab and update the data.
    const profileData = userData;
    
    profileData.firstName = firstName;
    profileData.lastName = lastName;

    // Apply the new changes.
    applyUserData(profileData);

    // Update current page, and navigate.
    updateCurPage(route.params.pageIndex + 1);
    navigation.navigate('Handle', {
      pageIndex: route.params.pageIndex + 1,
    });
  };

  // Return to the previous step in registration.
  const backtrack = () => {
    // Update current page, and navigate.
    updateCurPage(route.params.pageIndex - 1);
    navigation.navigate('Greet', {
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
        What is your&nbsp;
        <Text style={Styles.blueAccentText}>
        name?
        </Text>
      </Text>
      <View style={{marginTop: 15}}/>
      <TextInput 
        style={InputStyles.textInput}
        placeholder='john'
        onChangeText={text => setFirstName(text)}
      />
      <TextInput 
        style={InputStyles.textInput}
        placeholder='smith'
        onChangeText={text => setLastName(text)}
      />
    </GestureRecognizer>
  );
};
 
export default Name;
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
 * @param {Callback} updateCurPage
 */
const Name = ({ route, navigation, updateCurPage }) => {
  // Names are stateful
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // Proceed to the next step in registration.
  const proceed = () => {
    // Create profileData to be passed along.
    const profileData = route.params.profileData;

    if (firstName == '' || lastName == '')
      return;

    profileData.firstName = firstName;
    profileData.lastName = lastName;

    // Navigate with new items.
    navigation.navigate('Handle', {
      profileData: profileData,
      curPage: route.params.curPage + 1,
    });
  };

  const backtrack = () => {
    updateCurPage(route.params.curPage - 1);
    navigation.navigate('Greet', {
      curPage: route.params.curPage - 1,
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
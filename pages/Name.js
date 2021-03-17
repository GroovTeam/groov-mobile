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
const Name = ({ route, navigation }) => {
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
    });
  };

  return (
    <GestureRecognizer
      onSwipeLeft={proceed}
      onSwipeRight={() => navigation.navigate('Greet')}
      config={SwipeConfig}
      style={Styles.container}
    >
      <Text style={[Styles.text, Styles.headerText]}>
        What is your&nbsp;
        <Text style={Styles.blueAccentText}>
        name?
        </Text>
      </Text>
      <View style={{marginTop: 15}}>
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
      </View>
    </GestureRecognizer>
  );
};
 
export default Name;
import React from 'react';
import { Text } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Styles from '../components/Styles';
import SwipeConfig from '../components/SwipeConfig';

/**
 * Greets the user in registration.
 * 
 * @param {Navigator} navigation 
 */
const Greeting = ({ navigation }) => {

  // Proceed to the next step in registration.
  const proceed = () => {
    // Create profileData to be passed along.
    const profileData = {};

    // Navigate with new items.
    navigation.navigate('Name', {
      profileData: profileData,
    });
  };

  return (
    <GestureRecognizer
      onSwipeLeft={proceed}
      config={SwipeConfig}
      style={Styles.container}
    >
      <Text style={[Styles.text, Styles.headerText]}>
        Hi, nice to&nbsp;
        <Text style={Styles.blueAccentText}>
        meet&nbsp;
        </Text>
        you
      </Text>
      <Text style={[Styles.text, Styles.headerText]}>
        Let&apos;s get to&nbsp;
        <Text style={Styles.blueAccentText}>
        know&nbsp;
        </Text>
        each other
      </Text>
    </GestureRecognizer>
  );
};
 
export default Greeting;
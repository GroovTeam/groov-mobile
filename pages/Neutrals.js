import React from 'react';
import { Text } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { Styles, SwipeConfig } from '../components/ExpoComponents';
 
const Greeting = ({ navigation }) => {
  return (
  <GestureRecognizer
    onSwipeRight={() => navigation.navigate('Like')}
    onSwipeLeft={() => navigation.navigate('Dev')}
    config={SwipeConfig}
    style={Styles.container}
    >
      <Text style={Styles.text}>
      What are you&nbsp;
      <Text style={Styles.blueAccentText}>
      open&nbsp;
      </Text>
      to?
      </Text>
  </GestureRecognizer>
  );
}
 
export default Greeting;
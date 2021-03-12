import React from 'react';
import { Text } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { Styles, SwipeConfig } from '../components/ExpoComponents';

const Greeting = ({ navigation }) => {
  return (
    <GestureRecognizer
    onSwipeRight={() => navigation.navigate('Like')}
    onSwipeLeft={() => navigation.navigate('Neutral')}
    config={SwipeConfig}
    style={Styles.container}
    >
      <Text style={Styles.text}>
        What do you&nbsp;
        <Text style={Styles.redAccentText}>
        dislike?
        </Text>
      </Text>
    </GestureRecognizer>
  );
}
 
export default Greeting;
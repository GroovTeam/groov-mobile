import React from 'react';
import { Text } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { Styles, SwipeConfig } from '../components/ExpoComponents';
 
const Greeting = ({ navigation }) => {
  return (
    <GestureRecognizer
    onSwipeRight={() => navigation.navigate('Dev')}
    onSwipeLeft={() => navigation.navigate('Like')}
    config={SwipeConfig}
    style={Styles.container}
    >
      <Text style={Styles.text}>
        Hi, nice to&nbsp;
        <Text style={Styles.blueAccentText}>
        meet&nbsp;
        </Text>
        you
      </Text>
      <Text style={Styles.text}>
        Let's get to&nbsp;
        <Text style={Styles.blueAccentText}>
        know&nbsp;
        </Text>
        each other
      </Text>
    </GestureRecognizer>
  );
}
 
export default Greeting;
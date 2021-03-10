import React from 'react';
import {Text} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Styles from '../components/Styles';
 
const Greeting = ({ navigation }) => {
 
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };
 
  return (
    <GestureRecognizer
      onSwipeRight={() => navigation.navigate('Like')}
      onSwipeLeft={() => navigation.navigate('Dev')}
      config={config}
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
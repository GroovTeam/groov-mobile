import React from 'react';
import { Text } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Styles from '../components/Styles';
import SwipeConfig from '../components/SwipeConfig';
 
const Greeting = ({ navigation }) => {
  return (
    <GestureRecognizer
    onSwipeRight={() => navigation.navigate('Greet')}
    onSwipeLeft={() => navigation.navigate('Dislike')}
    config={SwipeConfig}
    style={Styles.container}
    >
      <Text style={Styles.text}>
        What do you&nbsp;
        <Text style={Styles.greenAccentText}>
        like?
        </Text>
      </Text>
    </GestureRecognizer>
  );
}
 
export default Greeting;
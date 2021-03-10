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
        onSwipeRight={() => navigation.navigate('Greet')}
        onSwipeLeft={() => navigation.navigate('Dislike')}
        config={config}
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
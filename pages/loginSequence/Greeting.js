import React from 'react';
import { Text } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Styles from '../../components/Styles';
import SwipeConfig from '../../utils/SwipeConfig';

/**
 * Greets the user in registration.
 * 
 * @param {Route} route
 * @param {Navigator} navigation 
 * @param {Callback} updateCurPage
 * @param {Callback} cancelRegistration
 */
const Greeting = ({ route, navigation, updateCurPage, cancelRegistration }) => {
  // Proceed to the next step in registration.
  const proceed = () => {
    // Update the page indicator.
    updateCurPage(route.params.pageIndex + 1);

    // Navigate with new items.
    navigation.navigate('Name', {
      pageIndex: route.params.pageIndex + 1,
    });
  };

  return (
    <GestureRecognizer
      onSwipeRight={cancelRegistration}
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
import React from 'react';
import { Text } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Styles from '../components/Styles';
import SwipeConfig from '../components/SwipeConfig';
import GenreSelections from '../components/GenreSelections';

const Greeting = ({ navigation }) => {

  const DATA = [
    'Rap',
    'Opera',
    'Country',
    'Pop',
    'Latin',
    'Musical-Theatre',
    'Rock',
    'Alternative',
    'Hip-Hop',
    'K-Pop',
    'Samba',
  ];

  return (
    <GestureRecognizer
    onSwipeRight={() => navigation.navigate('Like')}
    onSwipeLeft={() => navigation.navigate('Neutral')}
    config={SwipeConfig}
    style={Styles.container}
    >
      <Text style={Styles.headerText}>
        What do you&nbsp;
        <Text style={Styles.redAccentText}>
        dislike?
        </Text>
      </Text>
      <GenreSelections
        data={DATA}
        color={'#FF000044'}
      />
    </GestureRecognizer>
  );
}
 
export default Greeting;
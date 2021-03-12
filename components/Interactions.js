
import React from 'react'
import { View, StyleSheet } from 'react-native';
import { IconToggle } from 'react-native-material-ui';

/**
 * 
 * LIKE = 'favorite'
 * LIKE OUTLINE = 'favorite-border'
 * 
 */

const IconStyles = StyleSheet.create({
  'evenSpace': {
    justifyContent: 'space-evenly',
  },
});

const Icons = ({ style }) => {
  return (
    <View style={[style, IconStyles.evenSpace]}>
      <IconToggle name='keyboard-arrow-up'/>
      <IconToggle name='clear-all'/>
      <IconToggle name='keyboard-arrow-down'/>
    </View>
  );
};

export default Icons;
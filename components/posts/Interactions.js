
import React from 'react';
import { View, StyleSheet } from 'react-native';
import IconToggle from '../IconToggle';

// Space those icons nicely!
const IconStyles = StyleSheet.create({
  'evenSpace': {
    justifyContent: 'space-evenly',
  },
});

const Icons = ({ style }) => {
  return (
    <View style={[style, IconStyles.evenSpace]}>
      <IconToggle
        onActivate={() => {}}
        onDeactivate={() => {}}
        onIcon={'heart'}
        offIcon={'heart-outline'}
        color={'#dc143c'}
        size={20}
      />
      <IconToggle
        onActivate={() => {}}
        onDeactivate={() => {}}
        onIcon={'chatbox-ellipses-outline'}
        offIcon={'chatbox-outline'}
        color={'#000000'}
        size={20}
      />
    </View>
  );
};

export default Icons;
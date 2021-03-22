import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';

const window = Dimensions.get('window');
const windowWidth = window.width;

const BubbleStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  bubble: {
    width: windowWidth / 25,
    height: windowWidth / 25,
    backgroundColor: 'lightgrey',
    borderRadius: windowWidth,
    margin: 3,
  },
  selected: {
    backgroundColor: 'dimgrey',
  },
});

const PageBubble = ({numBubbles, index}) => {
  const bubbles = [];

  for (let i = 0; i < numBubbles; i++) {
    const style = [BubbleStyles.bubble];
    if (i === index)
      style.push(BubbleStyles.selected);
    bubbles.push(
      <View
        style={style}
        key={i}
      />
    );
  }
  
  return (
    <View style={BubbleStyles.container}>
      {bubbles}
    </View>
  );
};

export default PageBubble;
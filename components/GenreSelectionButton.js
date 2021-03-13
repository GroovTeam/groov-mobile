import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import Button from 'react-native-button';

const buttonStyles = StyleSheet.create({
  internalContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 'auto',
    overflow:'hidden',
    borderRadius: 25,
    borderColor: 'black',
    borderWidth: 0.8,
  },
  whiteBackground: {
    backgroundColor: 'white',
  },
  text: {
    color: 'rgb(0,0,0)',
    fontSize: 25,
    fontWeight: '200',
    textAlign: 'center',
  },
});

const GenreSelectionButton = ({ text, color, toggleSelf }) => {
  const [ selected, setSelected ] = useState(false);
  
  const customColor = StyleSheet.create({
    apply: {
      backgroundColor: color,
    },
  });

  const select = () => {
    setSelected(!selected);
    toggleSelf(text);
  }

  const selectedStyle = selected ? customColor.apply : buttonStyles.whiteBackground;

  return (
    <Button
      containerStyle={[buttonStyles.internalContainer, selectedStyle]}
      onPress={select}>
      <Text style={buttonStyles.text}>{text}</Text>
    </Button>
  );
}

export default GenreSelectionButton;
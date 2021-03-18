import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Button from 'react-native-button';

// Styles specifically for each button.
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
  text: {
    color: 'rgb(0,0,0)',
    fontSize: 15,
    fontWeight: '200',
    textAlign: 'center',
  },
});

const GenreButton = ({ text }) => {
  return (
    <Button containerStyle={buttonStyles.internalContainer}>
      <Text style={buttonStyles.text}>{text}</Text>
    </Button>
  );
};

export default GenreButton;
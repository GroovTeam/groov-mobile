import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Button from 'react-native-button';

const GenreButton = ({ text, fontSize }) => {

  const paddingScalar = (fontSize ? fontSize : 15) / 3;

  // Styles specifically for each button.
  const buttonStyles = StyleSheet.create({
    internalContainer: {
      paddingHorizontal: 2 * paddingScalar,
      paddingVertical: paddingScalar,
      height: 'auto',
      overflow:'hidden',
      borderRadius: 25,
      borderColor: 'black',
      borderWidth: 0.8,
    },
    text: {
      color: 'rgb(0,0,0)',
      fontSize: fontSize ? fontSize : 15,
      fontWeight: '200',
      textAlign: 'center',
    },
  });

  return (
    <Button containerStyle={buttonStyles.internalContainer}>
      <Text style={buttonStyles.text}>{text}</Text>
    </Button>
  );
};

export default GenreButton;
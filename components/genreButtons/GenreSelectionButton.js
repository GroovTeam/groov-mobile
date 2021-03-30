import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import Button from 'react-native-button';

/**
 * 
 * @param {String} text the text to be applied on this button.
 * @param {String} color the highlight color to be used for this button.
 * @param {Callback} toggleSelf callback to the GenreSelections, selects a button.
 */
const GenreSelectionButton = ({ text, color, fontSize, toggleSelf }) => {

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
    whiteBackground: {
      backgroundColor: 'white',
    },
    text: {
      color: 'rgb(0,0,0)',
      fontSize: fontSize ? fontSize : 25,
      fontWeight: '200',
      textAlign: 'center',
    },
  });

  const [ selected, setSelected ] = useState(false);
  
  // Simple custom color stylesheet.
  const customColor = StyleSheet.create({
    apply: {
      backgroundColor: color,
    },
  });

  // Callback manager.
  const select = () => {
    setSelected(!selected);
    toggleSelf(text);
  };

  // Ternary selection for background color based on selection status.
  const selectedStyle = selected ? customColor.apply : buttonStyles.whiteBackground;

  return (
    <Button
      containerStyle={[buttonStyles.internalContainer, selectedStyle]}
      onPress={select}>
      <Text style={buttonStyles.text}>{text}</Text>
    </Button>
  );
};

export default GenreSelectionButton;
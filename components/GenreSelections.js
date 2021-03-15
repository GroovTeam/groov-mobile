import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import GenreSelectionButton from './GenreSelectionButton';

const window = Dimensions.get("window");
const [ windowWidth, windowHeight ] = [ window.width, window.height ];

// Styles for organizing the buttons.
const containerStyles = StyleSheet.create({
  smallPadding: {
    padding: 2,
  },
  container: {
    marginTop: 50,
    display: 'flex',
    width: windowWidth - 100,
    maxHeight: windowHeight - 500,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
});

/**
 * 
 * @param {Object} data the data to render onto the buttons.
 * @param {String} color the color to render for selections.
 * @param {Callback} updateButtons update a button's status by key.
 * @returns 
 */
const GenreSelections = ({ data, color, updateButtons }) => {

  const items = []

  const toggleButton = (key) => {
    updateButtons(key);
  }

  for (const [key, value] of Object.entries(data)) {
    items.push(
    <View
      key={key}
      style={containerStyles.smallPadding}
    >
      <GenreSelectionButton
        text={key}
        color={color}
        toggleSelf={toggleButton}
        />
    </View>
    );
  }

  return (
    <View style={containerStyles.container}>
      {items}
    </View>
  );
}  

export default GenreSelections;

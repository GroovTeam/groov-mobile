import React from 'react';
import { View, StyleSheet } from 'react-native';
import GenreButton from './GenreButton';
import GenreSelectionButton from './GenreSelectionButton';
import { windowWidth, windowHeight } from '../../utils/Dimensions';

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
  staticContainer: {
    marginTop: 10,
    display: 'flex',
    width: windowWidth - 10,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden',
  }
});

/**
 * 
 * @param {Object} data the data to render onto the buttons.
 * @param {String} color the color to render for selections.
 * @param {Callback} updateButtons update a button's status by key.
 * @param {Boolean} isStatic whether the buttons are a static list.
 * @returns 
 */
const GenreSelections = ({ data, color, fontSize, updateButtons, isStatic }) => {
  const items = [];

  const toggleButton = (key) => {
    updateButtons(key);
  };

  if (isStatic) {
    for (const key in data) {
      items.push(
        <View style={containerStyles.smallPadding} key={data[key]}>
          <GenreButton text={data[key]}/>
        </View>
      );
    }

    return (
      <View style={containerStyles.staticContainer}>
        {items}
      </View>
    );
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
          fontSize={fontSize}
          toggleSelf={toggleButton}
          startSelected={value}
        />
      </View>
    );
  }

  return (
    <View style={containerStyles.container}>
      {items}
    </View>
  );
};

export default GenreSelections;

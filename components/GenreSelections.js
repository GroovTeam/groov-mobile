import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import GenreSelectionButton from './GenreSelectionButton';

const window = Dimensions.get("window");
const [ windowWidth, windowHeight ] = [ window.width, window.height ];

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

const GenreSelections = ({ data, color }) => {


  const items = []

  for (const [index, value] of data.entries()) {
    items.push(
    <View style={containerStyles.smallPadding}>
      <GenreSelectionButton
        text={value}
        color={color}
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

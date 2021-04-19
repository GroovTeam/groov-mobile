import React from 'react';
import { View } from 'react-native';
import GenreButton from '../genreButtons/GenreButton';

const Tags = ({ tags }) => {

  const renderableTags = [];

  tags.forEach(tag => {
    renderableTags.push(
      <View 
        style={{margin: 2}}
        key={tag}
      >
        <GenreButton
          text={tag}
          fontSize={10}
        />
      </View>
    );
  });

  return (
    <View style={{display: 'flex', flexDirection: 'row', flexWrap: 1}}>
      {renderableTags}
    </View>
  );
};

export default Tags;
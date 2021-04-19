import React from 'react';
import { View } from 'react-native';
import GenreButton from '../genreButtons/GenreButton';
import { windowWidth } from '../../utils/Dimensions';

const Posses = ({ posses }) => {

  const renderablePosses = [];

  posses.forEach(posse => {
    renderablePosses.push(
      <View style={{margin: 2}}>
        <GenreButton
          text={posse}
          fontSize={10}
        />
      </View>
    );
  });

  return (
    <View style={{display: 'flex', flexDirection: 'row', flexWrap: 1, marginLeft: 10, width: windowWidth * 0.6}}>
      {renderablePosses}
    </View>
  );
};

export default Posses;
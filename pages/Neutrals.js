import React, { useState } from 'react';
import { Text } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Styles from '../components/Styles';
import SwipeConfig from '../components/SwipeConfig';
import GenreSelections from '../components/GenreSelections';

const Neutrals = ({ route, navigation }) => {
  const [ genres, setGenres ] = useState(route.params.genres);

  const updateNeutrals = (key) => {
    const curGenres = genres;
    curGenres[key] = !curGenres[key];
    setGenres(curGenres);
  }

  const proceed = () => {
    // Deep clone genres
    const genresExcludingNeutrals = JSON.parse(JSON.stringify(genres));

    // Delete liked objects from options
    for (const [key, value] of Object.entries(genresExcludingNeutrals))
      if (value)
        delete genresExcludingNeutrals[key];

    // Navigate with new items
    navigation.navigate('Dev', {genres: genresExcludingNeutrals});
  }

  return (
  <GestureRecognizer
    onSwipeRight={() => navigation.navigate('Like')}
    onSwipeLeft={proceed}
    config={SwipeConfig}
    style={Styles.container}
    >
      <Text style={Styles.headerText}>
      What are you&nbsp;
      <Text style={Styles.blueAccentText}>
      open&nbsp;
      </Text>
      to?
      </Text>
      <GenreSelections
        data={genres}
        color={'#0000FF44'}
        updateButtons={updateNeutrals}
      />
  </GestureRecognizer>
  );
}
 
export default Neutrals;
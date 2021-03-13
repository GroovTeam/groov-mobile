import React, { useState } from 'react';
import { Text } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Styles from '../components/Styles';
import SwipeConfig from '../components/SwipeConfig';
import GenreSelections from '../components/GenreSelections';

const Dislikes = ({ route, navigation }) => {
  const [ genres, setGenres ] = useState(route.params.genres);

  const updateDisliked = (key) => {
    const curGenres = genres;
    curGenres[key] = !curGenres[key];
    setGenres(curGenres);
  }

  const proceed = () => {
    // Deep clone genres
    const genresExcludingDisliked =  JSON.parse(JSON.stringify(genres));

    // Delete liked objects from options
    for (const [key, value] of Object.entries(genresExcludingDisliked))
      if (value)
        delete genresExcludingDisliked[key];

    // Navigate with new items
    navigation.navigate('Neutral', {genres: genresExcludingDisliked});
  }

  return (
    <GestureRecognizer
    onSwipeRight={() => navigation.navigate('Like')}
    onSwipeLeft={proceed}
    config={SwipeConfig}
    style={Styles.container}
    >
      <Text style={Styles.headerText}>
        What do you&nbsp;
        <Text style={Styles.redAccentText}>
        dislike?
        </Text>
      </Text>
      <GenreSelections
        data={genres}
        color={'#FF000044'}
        updateButtons={updateDisliked}
      />
    </GestureRecognizer>
  );
}
 
export default Dislikes;
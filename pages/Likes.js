import React, { useState } from 'react';
import { Text } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Styles from '../components/Styles';
import SwipeConfig from '../components/SwipeConfig';
import GenreSelections from '../components/GenreSelections';

const Likes = ({ navigation }) => {

  const [ genres, setGenres ] = useState({
    'Rap': false,
    'Opera': false,
    'Country': false,
    'Pop': false,
    'Latin': false,
    'Musical-Theatre': false,
    'Rock': false,
    'Alternative': false,
    'Hip-Hop': false,
    'K-Pop': false,
    'Samba': false,
  });

  const updateLiked = (key) => {
    const curGenres = genres;
    curGenres[key] = !curGenres[key];
    setGenres(curGenres);
  }

  const proceed = () => {
    // Deep clone genres
    const genresExcludingLiked =  JSON.parse(JSON.stringify(genres));

    // Delete liked objects from options
    for (const [key, value] of Object.entries(genresExcludingLiked))
      if (value)
        delete genresExcludingLiked[key];

    // Navigate with new items
    navigation.navigate('Dislike', {genres: genresExcludingLiked});
  }

  return (
    <GestureRecognizer
    onSwipeRight={() => navigation.navigate('Greet')}
    onSwipeLeft={proceed}
    config={SwipeConfig}
    style={Styles.container}
    >
      <Text style={[Styles.text, Styles.headerText]}>
        What do you&nbsp;
        <Text style={Styles.greenAccentText}>
        like?
        </Text>
      </Text>
      <GenreSelections
        data={genres}
        color={'#00FF0044'}
        updateButtons={updateLiked}
      />
    </GestureRecognizer>
  );
}
 
export default Likes;
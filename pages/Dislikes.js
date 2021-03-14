import React, { useState } from 'react';
import { Text } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Styles from '../components/Styles';
import SwipeConfig from '../components/SwipeConfig';
import GenreSelections from '../components/GenreSelections';

/**
 * Selection menu for a user's dislikes.
 * 
 * @param {Route} route
 * @param {Navigator} navigation 
 */
const Dislikes = ({ route, navigation }) => {
  // Genres are stateful and inhereted from previous selections.
  const [ genres, setGenres ] = useState(route.params.genres);

  // Update a dislike by key.
  const updateDisliked = (key) => {
    const curGenres = genres;
    curGenres[key] = !curGenres[key];
    setGenres(curGenres);
  }

  // Proceed to the next step in registration.
  const proceed = () => {
    const profileData = route.params.profileData;
    const remainingGenres = {};

    // Add selected values to profileData, and push the rest to next step.
    for (const [key, value] of Object.entries(genres))
      if (value)
        profileData.disliked.push(key);
      else
        remainingGenres[key] = value;

    // Navigate with new items.
    navigation.navigate('Neutral', {
      genres: remainingGenres,
      profileData: profileData,
    });
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
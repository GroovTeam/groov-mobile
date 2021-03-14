import React, { useState } from 'react';
import { Text } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Styles from '../components/Styles';
import SwipeConfig from '../components/SwipeConfig';
import GenreSelections from '../components/GenreSelections';

/**
 * Selection menu for a user's likes.
 * 
 * @param {Navigator} navigation 
 */
const Likes = ({ navigation }) => {

  // Genres are stateful.
  // TODO: Retrieve genres from API.
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

  // Update a like by key.
  const updateLiked = (key) => {
    const curGenres = genres;
    curGenres[key] = !curGenres[key];
    setGenres(curGenres);
  }

  // Proceed to the next step in registration.
  const proceed = () => {
    // Create profileData to be passed along.
    const profileData = {
      liked: [],
      disliked: [],
      neutral: [],
    };
    const remainingGenres = {};

    // Add selected values to profileData, and push the rest to next step.
    for (const [key, value] of Object.entries(genres))
      if (value)
        profileData.liked.push(key);
      else
        remainingGenres[key] = value;

    // Navigate with new items.
    navigation.navigate('Dislike', {
      genres: remainingGenres,
      profileData: profileData,
    });
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
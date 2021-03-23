import React, { useState } from 'react';
import { Text } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Styles from '../components/Styles';
import SwipeConfig from '../components/SwipeConfig';
import GenreSelections from '../components/GenreSelections';

/**
 * Selection menu for a user's likes.
 * 
 * @param {Route} route 
 * @param {Navigator} navigation 
 */
const Likes = ({ route, navigation, userData, applyUserData, updateCurPage }) => {

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
  };

  // Proceed to the next step in registration.
  const proceed = () => {
    // Create profileData to be passed along.
    const profileData = userData;
    const remainingGenres = {};

    profileData.liked = [];

    // Add selected values to profileData, and push the rest to next step.
    for (const [key, value] of Object.entries(genres))
      if (value)
        profileData.liked.push(key);
      else
        remainingGenres[key] = value;

    // Apply the new changes.
    applyUserData(profileData);

    // Update current page, and navigate.
    updateCurPage(route.params.pageIndex + 1);
    navigation.navigate('Dislikes', {
      pageIndex: route.params.pageIndex + 1,
      genres: remainingGenres,
    });
  };

  // Return to the previous step in registration.
  const backtrack = () => {
    // Update current page, and navigate.
    updateCurPage(route.params.pageIndex - 1);
    navigation.navigate('Email', {
      pageIndex: route.params.pageIndex - 1,
    });
  };

  return (
    <GestureRecognizer
      onSwipeRight={backtrack}
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
};
 
export default Likes;
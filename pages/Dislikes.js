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
const Dislikes = ({ route, navigation, userData, applyUserData, updateCurPage }) => {
  // Genres are stateful and inhereted from previous selections.
  const [ genres, setGenres ] = useState(route.params.genres);

  // Update a dislike by key.
  const updateDisliked = (key) => {
    const curGenres = genres;
    curGenres[key] = !curGenres[key];
    setGenres(curGenres);
  };

  // Proceed to the next step in registration.
  const proceed = () => {
    const profileData = userData;
    const remainingGenres = {};

    profileData.disliked = [];

    // Add selected values to profileData, and push the rest to next step.
    for (const [key, value] of Object.entries(genres))
      if (value)
        profileData.disliked.push(key);
      else
        remainingGenres[key] = value;

    // Apply the new changes.
    applyUserData(profileData);

    // Update current page, and navigate.
    updateCurPage(route.params.pageIndex + 1);
    navigation.navigate('Neutrals', {
      pageIndex: route.params.pageIndex + 1,
      genres: remainingGenres,
    });
  };

  // Return to the previous step in registration.
  const backtrack = () => {
    // Update current page, and navigate.
    updateCurPage(route.params.pageIndex - 1);
    navigation.navigate('Likes', {
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
};
 
export default Dislikes;
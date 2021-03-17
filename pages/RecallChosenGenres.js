import React from 'react';
import { Text, View } from 'react-native';
import Styles from '../components/Styles';

/**
 * Shows the user all of their picked choices after registration.
 * 
 * @param {Route} route
 * @param {Navigator} navigation 
 */
const Profile = ({ route }) => {

  const profileData = route.params.profileData;
  const renderableProfileData = {
    firstName: null,
    lastName: null,
    handle: null,
    email: null,
    liked: [],
    disliked: [],
    neutral: [],
  };
  
  // Push all data from profile data into a renderable list.
  for (const [key, value] of Object.entries(profileData)) {

    if (Array.isArray(value)) {
      for (const e of value)
        renderableProfileData[key].push(
          <Text
            key={e}
            style={Styles.smallText}
          >
            {e},
          </Text>
        );
    }
    else
      renderableProfileData[key] = 
          <Text
            key={key}
            style={Styles.smallText}
          >
            {value},
          </Text>;
  }

  const finalRender = [];

  for (const [key, value] of Object.entries(renderableProfileData)) {
    finalRender.push(
      <View key={key}>
        <Text style={[Styles.text, Styles.blueAccentText]}>
          {key}
        </Text>
        {value}
      </View>
    );
  }

  return (
    <View style={Styles.container}>
      {finalRender}
    </View>
  );
};
 
export default Profile;
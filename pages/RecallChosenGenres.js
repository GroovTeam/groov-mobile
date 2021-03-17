import React from 'react';
import { Text, View } from 'react-native';
import Styles from '../components/Styles';

/**
 * Shows the user all of their picked choices after registration.
 * 
 * @param {Route} route
 * @param {Navigator} navigation 
 */
const Profile = ({ route, navigation }) => {

  const profileData = route.params.profileData;
  const renderableProfileData = {
    firstName: null,
    lastName: null,
    handle: null,
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
            style={Styles.text}
          >
              {e},
          </Text>
        );
    }
    else
      renderableProfileData[key] = 
          <Text
            key={key}
            style={Styles.text}
          >
              {value},
          </Text>
  }

  return (
    <View style={Styles.container}>
      <Text style={Styles.headerText}>
        FirstName:
      </Text>
      {renderableProfileData.firstName}
      <Text style={Styles.headerText}>
        LastName:
      </Text>
      {renderableProfileData.lastName}
      <Text style={Styles.headerText}>
        Handle:
      </Text>
      {renderableProfileData.handle}
      <Text style={Styles.headerText}>
        Likes:
      </Text>
      {renderableProfileData.liked}
      <Text style={[Styles.headerText, {marginTop: 15}]}>
        Dislikes:
      </Text>
      {renderableProfileData.disliked}
      <Text style={[Styles.headerText, {marginTop: 15}]}>
        Neutrals:
      </Text>
      {renderableProfileData.neutral}
    </View>
  );
}
 
export default Profile;
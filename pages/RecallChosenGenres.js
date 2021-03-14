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
    liked: [],
    disliked: [],
    neutral: [],
  };
  
  // Push all data from profile data into a renderable list.
  for (const [key, value] of Object.entries(profileData))
    for (const e of value)
      renderableProfileData[key].push(
        <Text style={Styles.text}>{e}, </Text>
      );

  return (
    <View style={Styles.container}>
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
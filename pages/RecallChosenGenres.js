import React from 'react';
import { Text, View } from 'react-native';
import Styles from '../components/Styles';
 
const Profile = ({ route, navigation }) => {

  const profileData = route.params.profileData;
  const renderableProfileData = {
    liked: [],
    disliked: [],
    neutral: [],
  };
  
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
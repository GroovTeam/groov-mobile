import React from 'react';
import { Text, View } from 'react-native';
import Styles from '../components/Styles';
 
const Profile = () => {
  return (
    <View style={Styles.container}>
      <Text style={Styles.text}>
        Profile here!
      </Text>
    </View>
  );
};

export default Profile;
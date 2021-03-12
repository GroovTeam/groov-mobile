import React from 'react';
import { Text, View } from 'react-native';
import { Styles } from '../components/ExpoComponents';
 
const Profile = ({ navigation }) => {
  return (
    <View style={Styles.container}>
      <Text style={Styles.text}>
        Explore here!
      </Text>
    </View>
  );
}
 
export default Profile;
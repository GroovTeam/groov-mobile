import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Styles from '../components/Styles';
import ProfileHeader from '../components/ProfileHeader';

const testUser = {
  user: 'Jacob Franz'
};

const ProfileStyles = StyleSheet.create ({
  headerContainer: {
    flex: 1,
  },
  bodyContinaer: {
    flex: 2,
  }
});

const Profile = () => {
  return (
    <SafeAreaView style={Styles.container}>
      <View style={ProfileStyles.headerContainer}>
        <ProfileHeader 
          data={testUser}
          style={ProfileStyles.headerContainer}
        />
      </View>
      <View style={ProfileStyles.bodyContinaer}>
        <Text style={Styles.text}>
          Profile in Progress! :)
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
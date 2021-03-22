import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Styles from '../components/Styles';
import ProfileHeader from '../components/ProfileHeader';
import ProfileBody from '../components/ProfileBody';

const testUser = {
  name: 'Jacob Franz',
  user: '@Zingsla',
  genres: ['Rap', 'Rock', 'Alternative', 'Opera', 'Musical Theater', 'Hip-Hop'],
  bio: 'Just a developer trying to make a cool app! More testing flavor text here...'
};

const ProfileStyles = StyleSheet.create ({
  headerContainer: {
    flex: 2,
  },
  bodyContainer: {
    flex: 3,
  },
});

const Profile = () => {
  return (
    <SafeAreaView style={Styles.container}>
      <View style={ProfileStyles.headerContainer}>
        <ProfileHeader data={testUser}/>
      </View>
      <View style={ProfileStyles.bodyContainer}>
        <ProfileBody/>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
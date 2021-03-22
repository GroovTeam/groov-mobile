import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
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
  profileContainer: {
    flex: 1,
  },
});

const Profile = () => {
  return (
    <SafeAreaView style={Styles.container}>
      <ScrollView style={ProfileStyles.profileContainer}>
        <ProfileHeader data={testUser}/>
        <ProfileBody/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
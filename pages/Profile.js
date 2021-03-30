import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';
import Styles from '../components/Styles';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileBody from '../components/profile/ProfileBody';

const ProfileStyles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    fontSize: 40,
  },
});

const testUser = {
  name: 'Jacob Franz',
  user: '@Zingsla',
  genres: ['Rap', 'Rock', 'Alternative', 'Opera', 'Musical Theater', 'Hip-Hop'],
  bio: 'Just a developer trying to make a cool app! More testing flavor text here...'
};

const DATA = [
  {
    id: '1',
    type: 'header',
    data: testUser,
  },
  {
    id: '2',
    type: 'body',
  },
  {
    id: '3',
    type: 'text',
  },
  {
    id: '4',
    type: 'text',
  },
  {
    id: '5',
    type: 'text',
  },
  {
    id: '6',
    type: 'text',
  },
  {
    id: '7',
    type: 'text',
  },
  {
    id: '8',
    type: 'text',
  },
  {
    id: '9',
    type: 'text',
  },
  {
    id: '10',
    type: 'text',
  },
];

const profileItem = ({ item }) => {
  if (item.type === 'header')
    return <ProfileHeader data={item.data} />;
  else if (item.type === 'body')
    return <ProfileBody />;
  else if (item.type === 'text') {
    return <Text style={ProfileStyles.item}>TESTING TEXT</Text>;
  }
};

const Profile = () => {
  return (
    <SafeAreaView style={Styles.container}>
      <FlatList
        data={DATA}
        renderItem={profileItem}
        stickyHeaderIndices={[1]}
      />
    </SafeAreaView>
  );
};

export default Profile;
import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import Styles from '../components/Styles';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileBody from '../components/profile/ProfileBody';

const testUser = {
  name: 'Jacob Franz',
  user: '@Zingsla',
  genres: ['Rap', 'Rock', 'Alternative', 'Opera', 'Musical Theater', 'Hip-Hop'],
  bio: 'Just a developer trying to make a cool app! More testing flavor text here...'
};

const DATA = [
  {
    id: '11',
    type: 'header',
    data: testUser,
  },
  {
    id: '12',
    type: 'body',
  },
];

const profileItem = ({ item }) => {
  if (item.type === 'header')
    return <ProfileHeader data={item.data} />;
  else
    return <ProfileBody />;
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
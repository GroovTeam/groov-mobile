import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';
import Styles from '../components/Styles';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileButtons from '../components/profile/ProfileButtons';

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

const DATA1 = [
  {
    id: '1',
    type: 'header',
    data: testUser,
  },
  {
    id: '2',
    type: 'buttons',
  },
];

const DATA2 = [
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
  else if (item.type === 'buttons')
    return <ProfileButtons />;
  else if (item.type === 'text') {
    return <Text style={ProfileStyles.item}>TESTING TEXT</Text>;
  }
};

const footerItem = () => {
  return (
    <FlatList
      data={DATA2}
      renderItem={profileItem}
    />
  );
};

const Profile = () => {
  return (
    <SafeAreaView style={Styles.container, Styles.androidSafeView}>
      <FlatList
        data={DATA1}
        renderItem={profileItem}
        stickyHeaderIndices={[1]}
        ListFooterComponent={footerItem}
      />
    </SafeAreaView>
  );
};

export default Profile;
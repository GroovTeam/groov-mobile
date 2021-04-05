import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';
import Styles from '../components/Styles';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileButtons from '../components/profile/ProfileButtons';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import NavStyles from '../components/NavStyles';
import { StatusBar } from 'expo-status-bar';
import logout from '../utils/logout';

const Profile = () => {
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

  const DATA2 = [
    {
      id: '1',
      type: 'header',
      data: testUser,
    },
    {
      id: '2',
      type: 'buttons',
    },
    {
      id: '3',
      type: 'text2',
    },
    {
      id: '4',
      type: 'text2',
    },
    {
      id: '5',
      type: 'text2',
    },
    {
      id: '6',
      type: 'text2',
    },
    {
      id: '7',
      type: 'text2',
    },
    {
      id: '8',
      type: 'text2',
    },
    {
      id: '9',
      type: 'text2',
    },
    {
      id: '10',
      type: 'text2',
    },
  ];

  const [refresh, setRefresh] = useState(false);
  const [profileData, setData] = useState(DATA1);

  let selectedIndex = 0;

  let updateIndex = (newIndex) => {
    selectedIndex = newIndex;
    
    if (selectedIndex === 0)
      setData(DATA1);
    else if (selectedIndex === 1)
      setData(DATA2);
    
    setRefresh(!refresh);
  };

  const logoutUser = async () => {
    await logout();
  };

  const profileItem = ({ item }) => {
    if (item.type === 'header')
      return <ProfileHeader data={item.data} />;
    else if (item.type === 'buttons')
      return <ProfileButtons function={updateIndex} />;
    else if (item.type === 'text')
      return <Text style={ProfileStyles.item}>TESTING TEXT</Text>;
    else if (item.type === 'text2')
      return <Text style={ProfileStyles.item}>TABS ARE WORKING!!!</Text>;
  };

  return (
    <SafeAreaView style={Styles.container, Styles.androidSafeView}>
      <NavBar style={NavStyles}>
        <NavTitle style={NavStyles.title}>
          {'Profile'}
        </NavTitle>
        <NavButton onPress={logoutUser}>
          <NavButtonText style={Styles.blueAccentText}>
            Logout
          </NavButtonText>
        </NavButton>
      </NavBar>
      <FlatList
        style={{backgroundColor: 'white'}}
        data={profileData}
        renderItem={profileItem}
        stickyHeaderIndices={[1]}
        extraData={refresh}
      />
      <StatusBar style='light' />
    </SafeAreaView>
  );
};

export default Profile;
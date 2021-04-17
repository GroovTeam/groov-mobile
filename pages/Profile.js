import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import Styles from '../components/Styles';
import SafeViewAndroid from '../components/SafeViewAndroid';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileButtons from '../components/profile/ProfileButtons';
import Posse from '../components/profile/Posse';
import Empty from '../components/profile/Empty';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import NavStyles from '../components/NavStyles';
import { StatusBar } from 'expo-status-bar';
import logout from '../utils/logout';
import getProfile from '../utils/getProfile';

const Profile = () => {
  const [posseData, setPosseData] = useState([]);
  const [likesData, setLikesData] = useState([]);
  const [profileData, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  let selectedIndex = 0;

  let updateIndex = (newIndex) => {
    selectedIndex = newIndex;
    
    if (selectedIndex === 0)
      setData(posseData);
    else if (selectedIndex === 1)
      setData(likesData);
    
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
    else if (item.type === 'posse')
      return <Posse data={item} />;
    else if (item.type === 'empty')
      return <Empty />;
  };

  const updateProfile = () => {
    getProfile()
      .then(res => {
        if (res.data === undefined) return;

        const tempPosseData = [];
        const tempLikesData = [];

        const header = {
          id: '1',
          type: 'header',
          data: res.data,
        };

        const buttons = {
          id: '2',
          type: 'buttons',
        };

        const empty = {
          id: '3',
          type: 'empty',
        };

        tempPosseData.push(header);
        tempPosseData.push(buttons);
        res.data.posses.forEach((f, index) => {
          let tempPosse = {};
          tempPosse.id = (index + 3).toString();
          tempPosse.name = f;
          tempPosse.imagePath = 'https://picsum.photos/200';
          tempPosse.type = 'posse';

          tempPosseData.push(tempPosse);
        });

        tempLikesData.push(header);
        tempLikesData.push(buttons);
        tempLikesData.push(empty);

        setPosseData(tempPosseData);
        setLikesData(tempLikesData);
        
        setData(tempPosseData);
      });
  };

  useEffect(() => {
    updateProfile();
  }, []);

  return (
    <SafeAreaView style={[SafeViewAndroid.AndroidSafeArea, {flex: 1, backgroundColor: 'white'}]}>
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
      <StatusBar style='dark' backgroundColor='white' />
    </SafeAreaView>
  );
};

export default Profile;
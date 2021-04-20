import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, View } from 'react-native';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import { StatusBar } from 'expo-status-bar';
import Styles from '../components/Styles';
import SafeViewAndroid from '../components/SafeViewAndroid';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileButtons from '../components/profile/ProfileButtons';
import EditProfileModal from '../components/profile/EditProfileModal';
import CreatePosse from '../components/profile/CreatePosse';
import CreatePosseModal from '../components/profile/CreatePosseModal';
import Posse from '../components/profile/Posse';
import Post from '../components/posts/Post';
import Empty from '../components/profile/Empty';
import NavStyles from '../components/NavStyles';
import logout from '../utils/logout';
import getProfile from '../utils/getProfile';
import getLikedPosts from '../utils/getLikedPosts';
import getUsersPosts from '../utils/getUsersPosts';
import getProfileByUsername from '../utils/getProfileByUsername';
import getLikedPostsByUsername from '../utils/getLikedPostsByUsername';
import getPostsByUsername from '../utils/getPostsByUsername'

const Profile = ({ username, likeSearch, backToFeed }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [posseData, setPosseData] = useState([]);
  const [likesData, setLikesData] = useState([]);
  const [postsData, setPostsData] = useState([]);
  const [profileData, setData] = useState([]);
  const [tabSwitch, setTabSwitch] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [creatingPosse, setCreatingPosse] = useState(false);

  const Tabs = {
    POSSES: 0,
    LIKES: 1,
    POSTS: 2,
  };

  let updateIndex = (newIndex) => {
    setSelectedIndex(newIndex);
    
    if (newIndex === Tabs.POSSES)
      setData(posseData);
    else if (newIndex === Tabs.LIKES)
      setData(likesData);
    else if (newIndex === Tabs.POSTS)
      setData(postsData);
    
    setTabSwitch(!tabSwitch);
  };
  
  const editProfile = () => {
    setEditingProfile(true);
  };

  const createPosse = () => {
    setCreatingPosse(true);
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
    else if (item.type === 'post')
      return <Post
        data={item}
        username={likeSearch ? likeSearch : item.currUser}
        canBeDeleted={!username}
        updatePosts={updateProfile} 
      />;
    else if (item.type === 'likedPost')
      return <Post
        data={item}
        username={likeSearch ? likeSearch : item.currUser}
      />;
    else if (item.type === 'posseAdd')
      return <CreatePosse createFunction={createPosse} />;
    else if (item.type === 'empty')
      return <Empty />;
  };

  const updateProfile = () => {
    setRefreshing(true);

    const getProf = username ? getProfileByUsername(username) : getProfile();
    const getLiked = username ? getLikedPostsByUsername(username) : getLikedPosts();
    const getPosts = username ? getPostsByUsername(username) : getUsersPosts();

    getProf
      .then(res => {
        if (res.data === undefined) return;

        const tempPosseData = [];
        const tempLikesData = [];
        const tempPostsData = [];

        const header = {
          id: '1',
          type: 'header',
          data: {
            ...res.data,
            imagePath: 'https://picsum.photos/200'
          },
        };

        const buttons = {
          id: '2',
          type: 'buttons',
        };

        const empty = {
          id: '3',
          type: 'empty',
        };

        const posseAdd = {
          id: '4',
          type: 'posseAdd',
        };

        tempPosseData.push(header);
        tempPosseData.push(buttons);
        tempPosseData.push(posseAdd);

        if (res.data.possesData) {
          res.data.possesData.forEach(f => {
            let tempPosse = {};
            tempPosse.id = f.posseID;
            tempPosse.name = f.name;
            tempPosse.imagePath = 'https://picsum.photos/200';
            tempPosse.type = 'posse';
  
            tempPosseData.push(tempPosse);
          });
        } else {
          tempPosseData.push(empty);
        }

        tempLikesData.push(header);
        tempLikesData.push(buttons);

        getLiked
          .then(likedRes => {
            if (likedRes.data === undefined) return;

            if (likedRes.data.results?.length > 0) {
              likedRes.data.results.forEach(post => {
                post.imagePath = 'https://picsum.photos/200';
                post.id = post.postID;
                post.type = 'likedPost';
                post.currUser = res.data.username;
                tempLikesData.push(post);
              });
            } else {
              tempLikesData.push(empty);
            }
          })
          .catch(console.error);

        tempPostsData.push(header);
        tempPostsData.push(buttons);

        getPosts
          .then(postsRes => {
            if (postsRes.data === undefined) return;

            if (postsRes.data.results?.length > 0) {
              postsRes.data.results.forEach(post => {
                post.imagePath = 'https://picsum.photos/200';
                post.id = post.postID;
                post.type = 'post';
                post.currUser = res.data.username;
                tempPostsData.push(post);
              });
            } else {
              tempPostsData.push(empty);
            }
          })
          .catch(console.error);

        setPosseData(tempPosseData);
        setLikesData(tempLikesData);
        setPostsData(tempPostsData);
        
        if (selectedIndex === Tabs.POSSES)
          setData(tempPosseData);
        else if (selectedIndex === Tabs.LIKES)
          setData(tempLikesData);
        else if (selectedIndex === Tabs.POSTS)
          setData(tempPostsData);
        
        setRefreshing(false);
        setTabSwitch(!tabSwitch);
      })
      .catch(console.error);
  };

  useEffect(() => {
    updateProfile();
  }, []);

  const editProfileLink =
    username ? (
      <View />
    ) : (
      <NavButton onPress={editProfile}>
        <NavButtonText style={Styles.blueAccentText}>
          Edit Profile
        </NavButtonText>
      </NavButton>
    );

  const logoutOrGoBack =
    username ? (
      <NavButton onPress={backToFeed}>
        <NavButtonText style={Styles.blueAccentText}>
          Go back
        </NavButtonText>
      </NavButton>
    ) : (
      <NavButton onPress={logoutUser}>
        <NavButtonText style={Styles.blueAccentText}>
          Logout
        </NavButtonText>
      </NavButton>
    );

  return (
    <SafeAreaView style={[SafeViewAndroid.AndroidSafeArea, {flex: 1, backgroundColor: 'white'}]}>
      <NavBar style={NavStyles}>
        <NavTitle style={NavStyles.title}>
          {'Profile'}
        </NavTitle>
        {editProfileLink}
        {logoutOrGoBack}
      </NavBar>
      <FlatList
        style={{backgroundColor: 'white'}}
        data={profileData}
        renderItem={profileItem}
        stickyHeaderIndices={[1]}
        extraData={tabSwitch}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={updateProfile}
          />
        }
      />
      <EditProfileModal
        editing={editingProfile}
        updateEditing={setEditingProfile}
        refreshProfile={updateProfile}
      />
      <CreatePosseModal
        creating={creatingPosse}
        updateCreating={setCreatingPosse}
        refreshProfile={updateProfile}
      />
      <StatusBar style='dark' backgroundColor='white' />
    </SafeAreaView>
  );
};

export default Profile;
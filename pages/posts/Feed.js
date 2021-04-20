import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, RefreshControl } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import NavStyles from '../../components/NavStyles';
import SafeViewAndroid from '../../components/SafeViewAndroid';
import NavBar, { NavButton, NavTitle } from 'react-native-nav';
import { Icon } from 'react-native-material-ui';
import Post from '../../components/posts/Post';
import getFeed from '../../utils/getFeed';
import getProfile from '../../utils/getProfile';
import CreatePost from './CreatePost';
import Profile from '../Profile';
import { StatusBar } from 'expo-status-bar';
import { windowHeight } from '../../utils/Dimensions';

const buttonSize = 35;

const backgroundColorTempFix = StyleSheet.create({
  fix: {
    height: windowHeight,
    backgroundColor: 'white'
  }
});

/**
 * Holds a user's feed.
 */
const Feed = () => {

  const [DATA, setDATA] = useState([]);
  const [posting, setPosting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [username, setUsername] = useState(undefined);
  const [viewingProfile, setViewingProfile] = useState(false);
  const [viewedProfile, setViewedProfile] = useState()

  const viewProfile = (profileUsername) => {
    setViewedProfile(profileUsername);
    setViewingProfile(true);
  }

  const backToFeed = () => {
    setViewingProfile(false);
    updateFeed();
  };

  // Retrieve the user's feed from the server.
  const updateFeed = () => {
    setRefreshing(true);

    // First get the user's profile, allowing us to check the liked list for the user.
    getProfile()
      .then(prof => {
        setUsername(prof.data.username);
        getFeed()
          .then(res => {
    
            if (res === undefined || res.data.results === undefined) return;
    
            const feed = res.data.results;
            const newDATA = [];
    
            feed.forEach(post => {
    
              // Add temp fillers
              post.imagePath = 'https://picsum.photos/200';
    
              post.key = post.postID;
              newDATA.push(post);
            });
            
            setDATA(newDATA);
            setRefreshing(false);
          })
          .catch(console.error);
      })
      .catch(console.error);

    setPosting(false);
  };

  // When the feed loads, get all posts for a user
  useEffect(() => {
    updateFeed();
  }, []);

  const renderItem = ({ item }) => (
    <Post
      data={item}
      username={username}
      viewProfile={viewProfile}
    />
  );

  if (posting)
    return <CreatePost returnToFeed={updateFeed} />;

  if (viewingProfile)
    return <Profile username={viewedProfile} likeSearch={username} backToFeed={backToFeed} />;

  return (
    <SafeAreaView style={[SafeViewAndroid.AndroidSafeArea, {flex: 1, backgroundColor: 'white'}]}>
      <NavBar style={NavStyles}>
        <NavTitle style={NavStyles.title}>
          {'The Soundwave'}
        </NavTitle>
        <NavButton onPress={()=> setPosting(true)}>
          <Icon
            name='add'
            color='rgb(59,108,212)'
            size={buttonSize}
          />
        </NavButton>
      </NavBar>
      <FlatList
        style={backgroundColorTempFix.fix}
        contentContainerStyle={{flexGrow: 0}}
        data={DATA}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={updateFeed}
          />
        }
      />
      <StatusBar style='dark' backgroundColor='white' />
    </SafeAreaView>
  );
};

export default Feed;
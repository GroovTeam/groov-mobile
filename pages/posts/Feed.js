import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Dimensions, RefreshControl } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import NavStyles from '../../components/NavStyles';
import SafeViewAndroid from '../../components/SafeViewAndroid';
import NavBar, { NavButton, NavTitle } from 'react-native-nav';
import { Icon } from 'react-native-material-ui';
import Post from '../../components/posts/Post';
import getFeed from '../../utils/getFeed';
import CreatePost from './CreatePost';
import { StatusBar } from 'expo-status-bar';

const buttonSize = 35;

const window = Dimensions.get('window');
const windowHeight = window.height;

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

  // Retrieve the user's feed from the server.
  const updateFeed = () => {
    getFeed()
      .then(res => {

        if (res === undefined || res.data.results === undefined) return;

        const feed = res.data.results;
        const newDATA = [];

        feed.forEach((f, index) => {

          // Add temp fillers
          f.imagePath = 'https://picsum.photos/200';

          f.key = index.toString();
          newDATA.push(f);
        });
        
        setDATA(newDATA);
      })
      .catch(console.error);

    setPosting(false);
  };

  // When the feed loads, get all posts for a user
  useEffect(() => {
    updateFeed();
  }, []);

  const renderItem = ({ item }) => (
    <Post data={item} />
  );

  if (posting)
    return <CreatePost
      returnToFeed={updateFeed}
    />;

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
        data={DATA}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            onRefresh={updateFeed}
          />
        }
      />
      <StatusBar style='dark' backgroundColor='white' />
    </SafeAreaView>
  );
};

export default Feed;
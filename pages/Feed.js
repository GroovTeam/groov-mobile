import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Styles from '../components/Styles';
import Post from '../components/posts/Post';
import getFeed from '../utils/getFeed';
import post from '../utils/post';
import createPosse from '../utils/createPosse';
import joinPosse from '../utils/joinPosse';

const header = {
  id: '0',
  title: true,
};

/**
 * Holds a user's feed.
 */
const Feed = () => {

  const [DATA, setDATA] = useState([ header ]);

  // When the feed loads, get all posts for a user
  useEffect(() => {
    getFeed()
      .then(res => {

        if (res === undefined || res.data.results === undefined) return;

        const feed = res.data.results;

        const newDATA = [ ...DATA ];

        feed.forEach(f => {
          f.imagePath = 'https://picsum.photos/200';
          newDATA.push(f);
        });
        
        setDATA(newDATA);
      })
      .catch(console.error);
  }, []);

  const renderItem = ({ item }) => (
    <Post data={item} />
  );

  return (
    <SafeAreaView style={Styles.container, Styles.stretch}>
      <FlatList
        style={{backgroundColor: 'white'}}
        data={DATA}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default Feed;
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Styles from '../components/Styles';
import Post from '../components/posts/Post';
import getFeed from '../utils/getFeed';
import post from '../utils/post';
import createPosse from '../utils/createPosse';
import joinPosse from '../utils/joinPosse';

/**
 * Holds a user's feed.
 */
const Feed = () => {

  const [DATA, setDATA] = useState([]);

  useEffect(() => {
    // All posts to be displayed.
    // TODO: Load these from the database.
    const header = {
      id: '0',
      title: true,
    };

    getFeed()
      .then(res => {
        const feed = res.data.results;

        feed.forEach(f => {
          f.imagePath = 'https://picsum.photos/200';
        });

        const newDATA = [
          header,
          ...feed,
        ];
        
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
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Styles from '../../components/Styles';
import NavBar, { NavButton, NavTitle } from 'react-native-nav';
import { Icon } from 'react-native-material-ui';
import Post from '../../components/posts/Post';
import getFeed from '../../utils/getFeed';
// import post from '../../utils/post';
// import createPosse from '../../utils/createPosse';
// import joinPosse from '../../utils/joinPosse';
import CreatePost from './CreatePost';

const buttonSize = 35;

/**
 * Holds a user's feed.
 */
const Feed = () => {

  const [DATA, setDATA] = useState([]);
  const [posting, setPosting] = useState(false);

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

  if (posting)
    return <CreatePost setPosting={setPosting}/>;

  return (
    <SafeAreaView style={Styles.container, Styles.stretch}>
      <NavBar>
        <NavTitle style={Styles.text}>
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
        style={{backgroundColor: 'white'}}
        data={DATA}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default Feed;
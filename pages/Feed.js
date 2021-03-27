import React from 'react';
import { SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Styles from '../components/Styles';
import Post from '../components/posts/Post';

// All posts to be displayed.
// TODO: Load these from the database.
const POSTS = [
  {
    id: '0',
    title: true,
  },
  {
    id: '1',
    user: 'Bobby Bigthumb',
    imagePath: 'https://picsum.photos/200',
    tags: ['The Grind', 'Humble'],
    body: 'Yooooo check out this track I just spun up. It falls into the pocket SO clean 😤😤😤',
  },
  {
    id: '2',
    user: 'IamJude',
    imagePath: 'https://picsum.photos/200',
    tags: ['Indie'],
    body: 'You’re kidding... If you haven’t heard this yet then it’s time you put some buds in 😴😴😴',
  },
  {
    id: '3',
    user: 'hateful_mouse',
    imagePath: 'https://picsum.photos/200',
    tags: ['Haters', 'Classical'],
    body: 'I’m fed up with all these fucking mumble rap pieces of shit 😡. Where did alll the artists go that actually put thought into their tracks??? #unfollowed',
  },
  {
    id: '4',
    user: 'Bobby Bigthumb',
    imagePath: 'https://picsum.photos/200',
    tags: ['The Grind', 'Humble'],
    body: 'Yooooo check out this track I just spun up. It falls into the pocket SO clean 😤😤😤',
  },
  {
    id: '5',
    user: 'IamJude',
    imagePath: 'https://picsum.photos/200',
    tags: ['Indie'],
    body: 'You’re kidding... If you haven’t heard this yet then it’s time you put some buds in 😴😴😴',
  },
  {
    id: '6',
    user: 'hateful_mouse',
    imagePath: 'https://picsum.photos/200',
    tags: ['Haters', 'Classical'],
    body: 'I’m fed up with all these fucking mumble rap pieces of shit 😡. Where did alll the artists go that actually put thought into their tracks??? #unfollowed',
  },
  {
    id: '7',
    user: 'Bobby Bigthumb',
    imagePath: 'https://picsum.photos/200',
    tags: ['The Grind', 'Humble'],
    body: 'Yooooo check out this track I just spun up. It falls into the pocket SO clean 😤😤😤',
  },
  {
    id: '8',
    user: 'IamJude',
    imagePath: 'https://picsum.photos/200',
    tags: ['Indie'],
    body: 'You’re kidding... If you haven’t heard this yet then it’s time you put some buds in 😴😴😴',
  },
  {
    id: '9',
    user: 'hateful_mouse',
    imagePath: 'https://picsum.photos/200',
    tags: ['Haters', 'Classical'],
    body: 'I’m fed up with all these fucking mumble rap pieces of shit 😡. Where did alll the artists go that actually put thought into their tracks??? #unfollowed',
  },
  {
    id: '10',
    user: 'Bobby Bigthumb',
    imagePath: 'https://picsum.photos/200',
    tags: ['The Grind', 'Humble'],
    body: 'Yooooo check out this track I just spun up. It falls into the pocket SO clean 😤😤😤',
  },
  {
    id: '11',
    user: 'IamJude',
    imagePath: 'https://picsum.photos/200',
    tags: ['Indie'],
    body: 'You’re kidding... If you haven’t heard this yet then it’s time you put some buds in 😴😴😴',
  },
  {
    id: '12',
    user: 'hateful_mouse',
    imagePath: 'https://picsum.photos/200',
    tags: ['Haters', 'Classical'],
    body: 'I’m fed up with all these fucking mumble rap pieces of shit 😡. Where did alll the artists go that actually put thought into their tracks??? #unfollowed',
  },
];

/**
 * Holds a user's feed.
 */
const Feed = () => {

  const renderItem = ({ item }) => (
    <Post data={item} />
  );

  return (
    <SafeAreaView style={Styles.container, Styles.stretch}>
      <FlatList
        style={{backgroundColor: 'white'}}
        data={POSTS}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default Feed;
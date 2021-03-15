import React from 'react';
import { SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Styles from '../components/Styles';
import Post from '../components/Post';

const POSTS = [
  {
    id: '0',
    title: true,
  },
  {
    id: '1',
    user: 'Bobby Bigthumb',
    tags: ['The Grind', 'Humble'],
    body: 'Yooooo check out this track I just spun up. It falls into the pocket SO clean 😤😤😤',
  },
  {
    id: '2',
    user: 'IamJude',
    tags: ['Indie'],
    body: 'You’re kidding... If you haven’t heard this yet then it’s time you put some buds in 😴😴😴',
  },
  {
    id: '3',
    user: 'hateful_mouse',
    tags: ['Haters', 'Classical'],
    body: 'I’m fed up with all these fucking mumble rap pieces of shit 😡. Where did alll the artists go that actually put thought into their tracks??? #unfollowed',
  },
  {
    id: '4',
    user: 'Bobby Bigthumb',
    tags: ['The Grind', 'Humble'],
    body: 'Yooooo check out this track I just spun up. It falls into the pocket SO clean 😤😤😤',
  },
  {
    id: '5',
    user: 'IamJude',
    tags: ['Indie'],
    body: 'You’re kidding... If you haven’t heard this yet then it’s time you put some buds in 😴😴😴',
  },
  {
    id: '6',
    user: 'hateful_mouse',
    tags: ['Haters', 'Classical'],
    body: 'I’m fed up with all these fucking mumble rap pieces of shit 😡. Where did alll the artists go that actually put thought into their tracks??? #unfollowed',
  },
  {
    id: '7',
    user: 'Bobby Bigthumb',
    tags: ['The Grind', 'Humble'],
    body: 'Yooooo check out this track I just spun up. It falls into the pocket SO clean 😤😤😤',
  },
  {
    id: '8',
    user: 'IamJude',
    tags: ['Indie'],
    body: 'You’re kidding... If you haven’t heard this yet then it’s time you put some buds in 😴😴😴',
  },
  {
    id: '9',
    user: 'hateful_mouse',
    tags: ['Haters', 'Classical'],
    body: 'I’m fed up with all these fucking mumble rap pieces of shit 😡. Where did alll the artists go that actually put thought into their tracks??? #unfollowed',
  },
  {
    id: '10',
    user: 'Bobby Bigthumb',
    tags: ['The Grind', 'Humble'],
    body: 'Yooooo check out this track I just spun up. It falls into the pocket SO clean 😤😤😤',
  },
  {
    id: '11',
    user: 'IamJude',
    tags: ['Indie'],
    body: 'You’re kidding... If you haven’t heard this yet then it’s time you put some buds in 😴😴😴',
  },
  {
    id: '12',
    user: 'hateful_mouse',
    tags: ['Haters', 'Classical'],
    body: 'I’m fed up with all these fucking mumble rap pieces of shit 😡. Where did alll the artists go that actually put thought into their tracks??? #unfollowed',
  },
];

const Feed = ({ navigation }) => {

  const renderItem = ({ item }) => (
    <Post data={item} />
  );

  return (
    <SafeAreaView style={Styles.container, Styles.stretch}>
      <FlatList
        data={POSTS}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}
 
export default Feed;
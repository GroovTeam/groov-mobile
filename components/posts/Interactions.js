
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import IconToggle from '../IconToggle';
import LikeButton from './LikeButton';
import like from '../../utils/like';
import unlike from '../../utils/unlike';

// Space those icons nicely!
const IconStyles = StyleSheet.create({
  'evenSpace': {
    justifyContent: 'space-evenly',
  },
});

const Interactions = ({ style, postID, likeCount, alreadyLiked }) => {

  const [likes, setLikes] = useState(likeCount);

  const onLike = async () => {
    setLikes(likes + 1);
    like(postID)
      .then(() => {
        console.log('liked post');
      })
      .catch(err => {
        console.error('Unable to like your post', err);
        setLikes(likes - 1);
      });
  };

  const onUnlike = async () => {
    setLikes(likes - 1);
    unlike(postID)
      .then(() => {
        console.log('unliked post');
      })
      .catch(err => {
        console.error('Unable to unlike your post', err);
        setLikes(likes + 1);
      });
  };

  return (
    <View style={[style, IconStyles.evenSpace]}>
      <IconToggle
        onActivate={() => {}}
        onDeactivate={() => {}}
        onIcon={'chatbox-ellipses-outline'}
        offIcon={'chatbox-outline'}
        color={'#000000'}
        size={20}
      />
      <LikeButton
        onLike={onLike}
        onUnlike={onUnlike}
        likeCount={likes}
        alreadyLiked={alreadyLiked}
      />
    </View>
  );
};

export default Interactions;
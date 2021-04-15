
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import IconToggle from '../IconToggle';
import LikeButton from './LikeButton';
import PlaybackMenu from './PlaybackMenu';
import like from '../../utils/like';
import unlike from '../../utils/unlike';

// Space those icons nicely!
const IconStyles = StyleSheet.create({
  'container': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 10
  },
});

const Interactions = ({ postID, likeCount, alreadyLiked, beatURL, recordingURL }) => {

  const [likes, setLikes] = useState(likeCount);
  const [playback, setPlayback] = useState(<View style={{width: 80}} />);

  useEffect(() => {
    if (beatURL || recordingURL) {
      setPlayback(
        <PlaybackMenu
          beatPath={beatURL}
          dubPath={recordingURL}
        />
      );
    }
  }, [beatURL, recordingURL]);

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
    <View style={IconStyles.container}>
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
      {playback}
    </View>
  );
};

export default Interactions;
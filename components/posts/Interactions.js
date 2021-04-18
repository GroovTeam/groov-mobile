
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { windowWidth } from '../../utils/Dimensions';
import Collapsible from 'react-native-collapsible';
import Comments from './Comments';
import IconToggle from '../IconToggle';
import LikeButton from './LikeButton';
import PlaybackMenu from './PlaybackMenu';
import like from '../../utils/like';
import unlike from '../../utils/unlike';

const Interactions = ({ postID, username, likes, beatURL, recordingURL }) => {

  const [likeCount, setLikeCount] = useState(likes ? likes.length : 0);
  const [playback, setPlayback] = useState(<View style={{width: 80}} />);
  const [isCommenting, setIsCommenting] = useState(true);

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
    setLikeCount(likeCount + 1);
    like(postID)
      .then(() => {
        console.log('liked post');
      })
      .catch(err => {
        console.error('Unable to like your post', err);
        setLikeCount(likeCount - 1);
      });
  };

  const onUnlike = async () => {
    setLikeCount(likeCount - 1);
    unlike(postID)
      .then(() => {
        console.log('unliked post');
      })
      .catch(err => {
        console.error('Unable to unlike your post', err);
        setLikeCount(likeCount + 1);
      });
  };

  return (
    <View style={InteractionsStyles.container}>
      <View style={InteractionsStyles.buttonsContainer}>
        <IconToggle
          onActivate={() => setIsCommenting(true)}
          onDeactivate={() => setIsCommenting(false)}
          onIcon={'chatbox-ellipses-outline'}
          offIcon={'chatbox-outline'}
          color={'#000000'}
          startStatus={true}
          size={20}
        />
        <LikeButton
          onLike={onLike}
          onUnlike={onUnlike}
          username={username}
          likes={likes}
          likeCount={likeCount}
        />
        {playback}
      </View>
      <Collapsible collapsed={!isCommenting}>
        <Comments postID={postID} username={username} />
      </Collapsible>
    </View>
  );
};

export default Interactions;

// Space those icons nicely!
const InteractionsStyles = StyleSheet.create({
  'container': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: windowWidth
  },
  'buttonsContainer': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    margin: 10
  },
  'commentsContainer': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    overflow: 'hidden'
  }
});
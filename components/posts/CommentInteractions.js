
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PostCommentModal from './PostCommentModal';
import LikeButton from './LikeButton';
import likeComment from '../../utils/likeComment';
import unlikeComment from '../../utils/unlikeComment';

const iconSize = 18;

const CommentInteractions = ({ commentID, username, likes, hasReply, updateComments }) => {

  const [likeCount, setLikeCount] = useState(likes ? likes.length : 0);
  const [replying, setReplying] = useState(false);

  const updateCommentAndStopReplying = () => {
    updateComments();
    setReplying(false);
  };

  const onLike = async () => {
    setLikeCount(likeCount + 1);
    likeComment(commentID)
      .then(() => {
        console.log('liked comment');
      })
      .catch(err => {
        console.error('Unable to like your comment', err);
        setLikeCount(likeCount - 1);
      });
  };

  const onUnlike = async () => {
    setLikeCount(likeCount - 1);
    unlikeComment(commentID)
      .then(() => {
        console.log('unliked comment');
      })
      .catch(err => {
        console.error('Unable to unlike your post', err);
        setLikeCount(likeCount + 1);
      });
  };

  const reply = hasReply ?
    ( 
      <TouchableOpacity onPress={() => setReplying(true)}>
        <Ionicons
          name={'return-down-back-outline'}
          color={'#000000'}
          size={iconSize}
        />
      </TouchableOpacity>
    ) :
    <View />;

  return (
    <View style={InteractionsStyles.buttonsContainer}>

      <PostCommentModal
        id={commentID}
        commenting={replying}
        updateCommenting={setReplying}
        updateComments={updateCommentAndStopReplying}
        isReply={true}
      />

      <LikeButton
        onLike={onLike}
        onUnlike={onUnlike}
        username={username}
        likes={likes}
        likeCount={likeCount}
        size={iconSize}
      />
      {reply}
    </View>
  );
};

export default CommentInteractions;

// Space those icons nicely!
const InteractionsStyles = StyleSheet.create({
  'buttonsContainer': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5
  },
});
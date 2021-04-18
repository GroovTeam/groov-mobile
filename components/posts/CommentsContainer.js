import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { windowWidth } from '../../utils/Dimensions';
import Comment from './Comment';
import { Ionicons } from '@expo/vector-icons';
import getComments from '../../utils/getComments';
import PostCommentModal from './PostCommentModal';

const CommentsStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: windowWidth * 0.7,
    marginBottom: 30,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%'
  },
  header: {
    fontSize: 25,
    fontWeight: '300',
  },
});

const CommentsContainer = ({ postID, username }) => {

  const [DATA, setDATA] = useState(undefined);
  const [commenting, setCommenting] = useState(false);

  useEffect(() => {
    updateComments();
  }, []);

  const updateComments = () => {
    getComments(postID)
      .then(res => {
        const DATA = [];

        const comments = res.data.results;

        comments.forEach(comment => {
          comment.key = comment.commentID;
          DATA.push(comment);
        });

        setDATA(DATA);
      });
    setCommenting(false);
  };

  const renderItem = ({ item }) => {
    return (
      <Comment
        comment={item}
        username={username}
        updateComments={updateComments}
      />
    );
  };

  if (!DATA?.length)
    return (
      <View style={[CommentsStyles.container, {marginBottom: 10}]}>
        <View style={[CommentsStyles.headerContainer, {marginBottom: 0}]}>
          <Text style={[CommentsStyles.header, {fontSize: 20}]}>
            Nothing here... yet!
          </Text>
          <TouchableOpacity onPress={() => setCommenting(true)}>
            <Ionicons
              name='add-outline'
              color='#000000'
              size={25}
            /> 
          </TouchableOpacity>
          <PostCommentModal
            id={postID}
            commenting={commenting}
            updateCommenting={setCommenting}
            updateComments={updateComments}
          />
        </View>
      </View>
    );

  return (
    <View style={CommentsStyles.container}>
      <View style={CommentsStyles.headerContainer}>
        <Text style={CommentsStyles.header}>
          Comments
        </Text>
        <TouchableOpacity onPress={() => setCommenting(true)}>
          <Ionicons
            name='return-down-back-outline'
            color='#000000'
            size={25}
          /> 
        </TouchableOpacity>
        <PostCommentModal
          id={postID}
          commenting={commenting}
          updateCommenting={setCommenting}
          updateComments={updateComments}
        />
      </View>
      
      <FlatList
        data={DATA}
        renderItem={renderItem}
      />
    </View>
  );
};

export default CommentsContainer;
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';
import CommentInteractions from './CommentInteractions';

const CommentStyles = StyleSheet.create ({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  flexHori: {
    flexDirection: 'row',
  },
  flexVert: {
    flexDirection: 'column',
  },
  topBorder: {
    borderTopWidth: 1,
    borderTopColor: '#888888',
  },
  user: {
    color: 'rgb(0,0,0)',
    fontSize: 13,
    fontWeight: 'bold',
  },
  text: {
    color: 'rgb(0,0,0)',
    fontSize: 25,
    fontWeight: '100',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  body: {
    padding: 5,
    paddingBottom: 0,
  },
});

const Comment = ({ comment, username, updateComments }) => {

  const [collapsed, setCollapsed] = useState(true);

  const renderItem = ({ item }) => {
    return (
      <View style={[
        CommentStyles.container,
        CommentStyles.flexVert,
        {marginLeft: 10, paddingLeft: 10, borderLeftWidth: 1, paddingBottom: 5}
      ]}>
        <View style={[
          CommentStyles.container,
          CommentStyles.flexHori,
        ]}>
          <View style={CommentStyles.text}>
            <Text style={CommentStyles.user}>{'@' + item.username}</Text>
            <Text style={[CommentStyles.body, {marginBottom: 5}]}>{item.content}</Text>
          </View>
        </View>
        {/* <CommentInteractions
          commentID={item.commentID}
          username={username}
          likes={item.likes}
        /> */}
      </View>
    );
  };

  return (
    <View style={[
      CommentStyles.container,
      CommentStyles.flexVert,
      {marginBottom: 20}
    ]}>
      <TouchableOpacity onPress={() => setCollapsed(!collapsed)}>
        <View style={[
          CommentStyles.container,
          CommentStyles.flexHori,
          {marginBottom: 5},
        ]}>
          <View style={CommentStyles.text}>
            <Text style={CommentStyles.user}>{'@' + comment.username}</Text>
            <Text style={CommentStyles.body}>{comment.content}</Text>
          </View>
        </View>
        <CommentInteractions
          commentID={comment.commentID}
          username={username}
          likes={comment.likes}
          updateComments={updateComments}
          hasReply={true}
        />
      </TouchableOpacity>
      <Collapsible collapsed={collapsed}>
        <FlatList
          data={comment.replies}
          renderItem={renderItem}
          keyExtractor={item => item.username + '-' + item.timeStamp._nanoseconds}
        />
      </Collapsible>
    </View>
  );
};

export default Comment;
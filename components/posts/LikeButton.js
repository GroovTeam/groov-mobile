import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import IconToggle from '../IconToggle';

const LikeStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const LikeButton = ({ onLike, onUnlike, username, likes, likeCount, size }) => {

  const alreadyLiked = likes?.includes(username);

  return (
    <View style={LikeStyles.container}>
      <IconToggle
        onActivate={onLike}
        onDeactivate={onUnlike}
        onIcon={'heart'}
        offIcon={'heart-outline'}
        color={'#dc143c'}
        startStatus={alreadyLiked}
        size={size ? size : 20}
      />
      <Text style={{fontWeight: '200', fontSize: 15, marginLeft: 1}}>
        {likeCount}
      </Text>
    </View>
  );
};

export default LikeButton;
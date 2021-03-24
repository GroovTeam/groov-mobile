import React from 'react';
import { Text, View, Image, Dimensions, StyleSheet } from 'react-native';
import Interactions from './Interactions';
import favicon from '../../assets/favicon.png';

const window = Dimensions.get('window');
const windowWidth = window.width;

// Styles useful for posts. (probably move to independent file soon?)
const PostStyles = StyleSheet.create ({
  container: {
    color: 'rgb(255,255,255)',
    display: 'flex',
    justifyContent: 'flex-start',
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
  padded: {
    padding: 15,
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
    textAlign: 'center',
    marginLeft: 10,
  },
  header: {
    marginTop: 25,
    padding: 5,
    paddingLeft: 10,
    alignItems: 'flex-start',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  body: {
    width: (windowWidth - 100),
  },
  negativeMargin: {
    marginTop: -15,
  },
});

const Post = ({ data }) => {

  // Render title if necessary.
  if ('title' in data) {
    return (
      <View style={PostStyles.header}>
        <Text style={PostStyles.text}>The Soundwave</Text>
      </View>
    );  
  }

  // Otherwise return post container.
  return (
    <View style={[
      PostStyles.container,
      PostStyles.flexVert,
      PostStyles.topBorder,
    ]}>
      <View style={[
        PostStyles.container,
        PostStyles.flexHori,
        PostStyles.padded,
      ]}>
        <Image
          style={PostStyles.image}
          source={favicon}
        />
        <View style={PostStyles.text}>
          <Text style={PostStyles.user}>{data.user}</Text>
          <Text style={PostStyles.body}>{data.body}</Text>
        </View>
      </View>
      <Interactions style={[
        PostStyles.container,
        PostStyles.flexHori,
        PostStyles.negativeMargin,
      ]}/>
    </View>
  );
};

export default Post;
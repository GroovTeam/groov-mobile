import React, { useState, useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import Interactions from './Interactions';
import PostStyles from '../PostStyles';
import axios from 'axios';

const Post = ({ data }) => {
  const [profilePhoto, setProfilePhoto] = useState(undefined);

  useEffect(() => {
    // Get their image from the server.
    axios.get(data.imagePath)
      .then(res => setProfilePhoto(res.request.responseURL))
      .catch(err => console.error(err));
  }, []);

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
          source={{uri: profilePhoto}}
        />
        <View style={PostStyles.text}>
          <Text style={PostStyles.user}>{'@' + data.username}</Text>
          <Text style={PostStyles.body}>{data.content}</Text>
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
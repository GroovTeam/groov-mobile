import React, { useState, useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import Interactions from './Interactions';
import PostStyles from '../PostStyles';
import axios from 'axios';
import getFile from '../../utils/getFile';

const Post = ({ data, username }) => {
  const [profilePhoto, setProfilePhoto] = useState(undefined);
  const [beatURL, setBeatURL] = useState(undefined);
  const [recordingURL, setRecordingURL] =  useState(undefined);

  useEffect(() => {
    async function asyncWrapper() {
      // Get their image from the server.
      axios.get(data.imagePath)
        .then(res => setProfilePhoto(res.request.responseURL))
        .catch(err => console.error(err));

      // Get the streamable urls from the server.
      if (data.hasAudio) {
        await getFile(data.beatFile)
          .then(res => setBeatURL(res))
          .catch(console.error);
        await getFile(data.recordingFile)
          .then(res => setRecordingURL(res))
          .catch(console.error);
      }
    }
    asyncWrapper();
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
      <Interactions 
        postID={data.postID}
        username={username}
        likes={data.likes}
        recordingURL={recordingURL}
        beatURL={beatURL}
      />
    </View>
  );
};

export default Post;
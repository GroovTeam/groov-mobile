import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import Interactions from './Interactions';
import axios from 'axios';
import getFile from '../../utils/getFile';
import PlaybackMenu from './PlaybackMenu';

// Styles useful for posts. (probably move to independent file soon?)
const PostStyles = StyleSheet.create ({
  container: {
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
    paddingBottom: 0
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
    marginTop: 4,
    width: 'auto',
  },
  playbackMenu: {
    marginLeft: 'auto'
  },
  negativeMargin: {
    marginTop: -20,
    marginBottom: 5
  },
});

const Post = ({ data }) => {
  const [profilePhoto, setProfilePhoto] = useState(undefined);
  const [beatURL, setBeatURL] = useState(undefined);
  const [recordingURL, setRecordingURL] =  useState(undefined);
  const [playback, setPlayback] = useState(<View />);

  useEffect(() => {
    if (beatURL || recordingURL) {
      setPlayback(
        <View style={PostStyles.playbackMenu}>
          <PlaybackMenu
            beatPath={beatURL}
            dubPath={recordingURL}
          />
        </View>
      );
    }
  }, [beatURL, recordingURL]);

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
        {playback}
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
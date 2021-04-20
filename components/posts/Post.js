import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import Interactions from './Interactions';
import Posses from './Posses';
import Tags from './Tags';
import Collapsible from 'react-native-collapsible';
import PostStyles from '../PostStyles';
import ConfirmDeletePostModal from './ConfirmDeletePostModal';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import getFile from '../../utils/getFile';

const Post = ({ data, username, canBeDeleted, updatePosts }) => {
  const [profilePhoto, setProfilePhoto] = useState(undefined);
  const [beatURL, setBeatURL] = useState(undefined);
  const [recordingURL, setRecordingURL] =  useState(undefined);
  const [tagsShown, setTagsShown] = useState(false);
  const [deletingPost, setDeletingPost] = useState(false);

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

  const confirmDeletePost = () => {
    setDeletingPost(true);
  };

  const remove =
  canBeDeleted ? (
    <TouchableOpacity onPress={confirmDeletePost}>
      <Ionicons name={'trash-outline'} size={24} />
    </TouchableOpacity>
  ) : (
    <View />
  );

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
          <View style={[
            PostStyles.container,
            PostStyles.flexHori
          ]}>
            <Text style={PostStyles.user}>{'@' + data.username}</Text>
            <Posses posses={data.posses} />
            <View style={{marginLeft: 'auto'}}>
              {remove}
            </View>
          </View>
          <Text style={PostStyles.body}>{data.content}</Text>
          <View style={{marginTop: 10}}>
            <TouchableOpacity onPress={() => setTagsShown(!tagsShown)}>
              <Text style={{fontSize: 10, color: '#007bff'}}>
                {tagsShown ? 'Hide tags' : 'Show tags'}
              </Text>
            </TouchableOpacity>
            <View style={{height: 5}} />
            <Collapsible collapsed={!tagsShown}>
              <Tags tags={data.tags} />
            </Collapsible>
          </View>
        </View>
      </View>
      <Interactions 
        postID={data.postID}
        username={username}
        likes={data.likes}
        recordingURL={recordingURL}
        beatURL={beatURL}
      />
      <ConfirmDeletePostModal
        id={data.postID}
        deleting={deletingPost}
        updateDeleting={setDeletingPost}
        updatePosts={updatePosts}
      />
    </View>
  );
};

export default Post;
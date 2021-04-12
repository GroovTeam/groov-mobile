import React, { useState } from 'react';
import { Text, StyleSheet, SafeAreaView, View, Dimensions, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import Styles from '../../components/Styles';
import SafeViewAndroid from '../../components/SafeViewAndroid';
import getProfile from '../../utils/getProfile';
import GenreSelections from '../../components/genreButtons/GenreSelections';
import { Button } from 'react-native-material-ui';
import post from '../../utils/post';
import NavStyles from '../../components/NavStyles';
import Tags from '../../utils/Tags';
import ChooseBeatAndRecord from './ChooseBeatAndRecord';
import { StatusBar } from 'expo-status-bar';
import firebase from '../../utils/Firebase';
import FirebaseConfig from '../../utils/FirebaseConfig';

/*
{
    "content": "metal post",
    "posses" : ["cool guys", "group1"],
    "tags" : ["metal"]
}
*/

const window = Dimensions.get('window');
const [windowWidth, windowHeight] = [window.width, window.height];

const CreatePostStyles = StyleSheet.create({
  white: {
    backgroundColor: 'white'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: windowHeight - 100, // weird constant for now
    backgroundColor: 'white'
  },
  label: {
    fontSize: 25,
  },
  input: {
    borderColor: 'black',
    borderBottomWidth: 1,
    borderRadius: 15,
    padding: 10,
    width: windowWidth * 0.8,
  },
  multiline: {
    borderWidth: 1,
  },
  selections: {
    marginTop: -40
  },
  spacer: {
    marginTop: 40
  }
});

const CreatePost = ({ returnToFeed }) => {

  const [posses, setPosses] = useState({});
  // const [posses_og, setPosses_og] = useState([]); <-- Enable this if you need posses in their original form
  const [content, setContent] = useState('');
  const [tags, setTags] = useState(Tags);

  const [recording, setRecording] = useState(false);

  // The physical path of a recording
  const [recordingPhysicalPath, setRecordingPhysicalPath] = useState(undefined);
  // The path to the selected beat on the server
  const [beatServerPath, setBeatServerPath] = useState(undefined);

  useState(() => {
  // Store the posses in the posses variable
    getProfile()
      .then(res => {
        if (res.data) {
          const posses = res.data.posses;
          if (posses) {

            const posseSelections = {};
            posses.forEach(posse => {
              posseSelections[posse] = false;
            });

            // setPosses(posses); <-- Enable this if you need posses in their original form
            setPosses(posseSelections);
          }
        }
      })
      .catch(console.error);
  }, []);

  // Update a posse by key.
  const updatePosses = (key) => {
    const newPosses = posses;
    newPosses[key] = !newPosses[key];
    setPosses(newPosses);
  };

  // Update a tag by key.
  const updateTags = (key) => {
    const newTags = tags;
    newTags[key] = !newTags[key];
    setTags(newTags);
  };

  // Parses the input data.
  const constructPost = () => {

    const selectedPosses = [];
    const selectedTags = [];

    for (const [key, value] of Object.entries(posses))
      if (value)
        selectedPosses.push(key);

    for (const [key, value] of Object.entries(tags))
      if (value)
        selectedTags.push(key);

    const body = {
      content: content,
      posses: selectedPosses,
      tags: selectedTags,
    };

    return body;
  };

  // Calls upon constructPost to generate the body, then sends it off to the API
  const makePost = async () => {

    const body = constructPost();

    // We must first send the local recording file to the server.
    // Naming scheme is as follows uuid-date
    // Root reference
    if (recordingPhysicalPath) {
      const storageRef = firebase.storage().ref();

      // Construct a unique identifier
      const postUUID = firebase.auth().currentUser.uid + '-' + Date.now();
      const fileRef = storageRef.child('recordings/' + postUUID);

      const response = await fetch(recordingPhysicalPath);
      const blob = await response.blob();

      // Post the blob to the server
      await fileRef.put(blob)
        .then(() => {

          // Configure the new recording's path.
          const recordingPath = 'gs://' + FirebaseConfig.storageBucket + '/recordings/' + postUUID;

          // prep the body to contain audio
          body.hasAudio = true;

          body.beatFile = beatServerPath;
          body.recordingFile = recordingPath;

          post(body)
            .then(() => {
              returnToFeed();
            })
            .catch(console.error);
        })
        .catch(console.error);
    }
    else {
      post(body)
        .then(() => {
          returnToFeed();
        })
        .catch(console.error);
    }
  };

  const doneRecording = (beatPath, recordingPath) => {

    // Since we are done recording, fetch the paths of the created data.
    setBeatServerPath(beatPath);
    setRecordingPhysicalPath(recordingPath);

    setRecording(false);
  };

  const logPaths = () => {
    console.log(beatServerPath);
    console.log(recordingPhysicalPath);
  };
  
  if (recording) return <ChooseBeatAndRecord doneRecording={doneRecording}/>;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={[SafeViewAndroid.AndroidSafeArea, {flex: 1, backgroundColor: 'white'}]}>
        <NavBar style={NavStyles}>
          <NavTitle style={NavStyles.title}>
            {'Create Post'}
          </NavTitle>
          <NavButton onPress={returnToFeed}>
            <NavButtonText style={Styles.blueAccentText}>
              Go back
            </NavButtonText>
          </NavButton>
        </NavBar>

        <View style={CreatePostStyles.container}>

          <View>
            <Text style={CreatePostStyles.label}>
              Content
            </Text>
            <TextInput
              style={[
                CreatePostStyles.input,
                CreatePostStyles.multiline,
                {marginTop: 15}
              ]}
              onChangeText={text => setContent(text)}
              value={content}
              multiline={true}
            />
          </View>

          <View>
            <Text style={CreatePostStyles.label}>
              Select your posses
            </Text>
            <View style={CreatePostStyles.selections}>
              <GenreSelections
                data={posses}
                color={'#007BFF44'}
                fontSize={15}
                updateButtons={updatePosses}
              />
            </View>
          </View>

          <View>
            <Text style={CreatePostStyles.label}>
              Select your tags
            </Text>
            <View style={CreatePostStyles.selections}>
              <GenreSelections
                data={tags}
                color={'#007BFF44'}
                fontSize={15}
                updateButtons={updateTags}
              />
            </View>
          </View>

          <Button
            primary
            raised
            text='Attach Recording'
            onPress={() => setRecording(true)}
          />

          <Button
            primary
            raised
            text='Post'
            onPress={makePost}
          />

          <Button
            primary
            raised
            text='Log'
            onPress={logPaths}
          />

        </View>
        <StatusBar style='dark' backgroundColor='white' />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default CreatePost;

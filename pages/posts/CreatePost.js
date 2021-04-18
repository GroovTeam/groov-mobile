import React, { useState } from 'react';
import { Text, StyleSheet, SafeAreaView, View, Keyboard, TouchableWithoutFeedback, Alert, TextInput } from 'react-native';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import { StatusBar } from 'expo-status-bar';
import { Button } from 'react-native-material-ui';
import Styles from '../../components/Styles';
import NavStyles from '../../components/NavStyles';
import SafeViewAndroid from '../../components/SafeViewAndroid';
import GenreSelections from '../../components/genreButtons/GenreSelections';
import Tags from '../../utils/Tags';
import firebase from '../../utils/Firebase';
import FirebaseConfig from '../../utils/FirebaseConfig';
import post from '../../utils/post';
import getProfile from '../../utils/getProfile';
import ChooseBeatAndRecord from './ChooseBeatAndRecord';
import DismissableBubble from '../../components/DismissableBubble';
import { windowWidth } from '../../utils/Dimensions';

const CreatePostStyles = StyleSheet.create({
  white: {
    backgroundColor: 'white'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 'auto',
    backgroundColor: 'white'
  },
  label: {
    fontSize: 25,
    alignSelf: 'center'
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

  // The name of the recorded beat
  const [beatName, setBeatName] = useState(undefined);

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

    if (!body.content) {
      Alert.alert(
        'Hold up.',
        'Add some content!'
      );
      return;
    }

    if (body.posses?.length === 0) {
      Alert.alert(
        'Hold up.',
        'Add some posses!'
      );
      return;
    }

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

  const doneRecording = (beatName, beatPath, recordingPath) => {

    setRecording(false);

    if (!(beatName && beatPath && recordingPath))
      return;

    // Since we are done recording, fetch the paths of the created data.
    setBeatServerPath(beatPath);
    setRecordingPhysicalPath(recordingPath);

    setBeatName(beatName);
  };

  const clearRecording = () => {
    setBeatServerPath(undefined);
    setRecordingPhysicalPath(undefined);
    setBeatName(undefined);
  };

  const recordOrShow =
  beatName ? (
    <DismissableBubble
      text={beatName}
      size={18}
      dismiss={clearRecording}
    />
  ) : (
    <Button
      primary
      raised
      text='Freestyle'
      onPress={() => setRecording(true)}
    />
  );
  
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
              Posses
            </Text>
            <View style={CreatePostStyles.selections}>
              <GenreSelections
                data={posses}
                color={'#007BFF44'}
                fontSize={18}
                updateButtons={updatePosses}
              />
            </View>
          </View>

          <View>
            <Text style={CreatePostStyles.label}>
              Tags
            </Text>
            <View style={CreatePostStyles.selections}>
              <GenreSelections
                data={tags}
                color={'#007BFF44'}
                fontSize={18}
                updateButtons={updateTags}
              />
            </View>
          </View>

          <View>
            <Text style={[CreatePostStyles.label, {marginBottom: 10}]}>
              {beatName ? 'Attached freestyle' : undefined}
            </Text>
            {recordOrShow}
          </View>
          

          <Button
            primary
            raised
            text='Post'
            onPress={makePost}
          />

        </View>
        <StatusBar style='dark' backgroundColor='white' />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default CreatePost;

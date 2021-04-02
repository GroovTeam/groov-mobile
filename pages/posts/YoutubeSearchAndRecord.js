import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Dimensions } from 'react-native';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import Styles from '../../components/Styles';
import { Button } from 'react-native-material-ui';
import NavStyles from '../../components/NavStyles';
import { Audio } from 'expo-av';

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
    height: windowHeight * 0.85,
    backgroundColor: 'white'
  },
  label: {
    fontSize: 25,
  },
  input: {
    borderColor: 'black',
    borderBottomWidth: 1,
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

const CreatePost = ({ doneRecording }) => {

  const [recording, setRecording] = useState(undefined);

  const startRecording = async () => {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      console.log('Starting recording..');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync(); 
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); 
    console.log('Recording stopped and stored at', uri);
  }

  return (
    <View>
      <NavBar style={NavStyles}>
        <NavTitle style={NavStyles.title}>
          {'Create Post'}
        </NavTitle>
        <NavButton onPress={doneRecording}>
          <NavButtonText style={Styles.blueAccentText}>
            Go back
          </NavButtonText>
        </NavButton>
      </NavBar>

      <View style={CreatePostStyles.container}>

        <View style={CreatePostStyles.spacer} />

        <View>
          <Button
            primary
            raised
            text={recording ? 'Stop Recording' : 'Start Recording'}
            onPress={recording ? stopRecording : startRecording}
          />
        </View>

      </View>
    </View>
  );
};

export default CreatePost;

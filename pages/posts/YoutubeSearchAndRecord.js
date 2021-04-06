import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View, Dimensions, Text } from 'react-native';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import Styles from '../../components/Styles';
import { Button } from 'react-native-material-ui';
import NavStyles from '../../components/NavStyles';
import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av';
import BeatScroller from '../../components/posts/BeatScroller';

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
    height: windowHeight - 125,
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
  const [uri, setUri] = useState(undefined);
  const [recordedSound, setRecordedSound] = useState(undefined);
  const [beatSound, setBeatSound] = useState(undefined);
  const [recordDelay, setRecordDelay] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    return () => {
      console.log('Unloading all sounds');
      stopPlaying();
    };
  }, []);

  const playbackBeatAndRecord = async () => {
    try {
      // Prepare the recording
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 
      console.log('Starting recording..');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);

      // Prepare the audio session
      await unloadBeat();
      console.log('Playing beat');
      const beatSound = new Audio.Sound();
      await beatSound.loadAsync(require('../../test_sounds/joey.mp3'));
      

      // Start recording and audio
      await beatSound.playAsync();
      const startPlay = Date.now();
      await recording.startAsync();
      const startRec = Date.now();

      const offset =  startRec - startPlay;

      console.log(offset);
      setRecordDelay(offset);
      console.log(recordDelay);

      setRecording(recording);
      setBeatSound(beatSound);

    } catch (err) {
      console.error(err);
    }
  };

  const unloadRecorded = async () => {
    if (!recordedSound) return;
    console.log('Unloading recording');
    await recordedSound.unloadAsync();
    setRecordedSound(undefined);
  };

  const unloadBeat = async () => {
    if (!beatSound) return;
    console.log('Unloading beat');
    await beatSound.unloadAsync();
    setBeatSound(undefined);
  };

  const playBeatAndRecording = async () => {
    try {
      if (!uri) return;
      await unloadRecorded();
      const recordedSound = new Audio.Sound();
      await recordedSound.loadAsync({uri: uri});
      setRecordedSound(recordedSound);

      await unloadBeat();
      const beatSound = new Audio.Sound();
      await beatSound.loadAsync(require('../../test_sounds/joey.mp3'));
      await beatSound.setVolumeAsync(0.5);
      setBeatSound(beatSound);

      // Start recording and audio
      await recordedSound.playAsync();
      setTimeout(() => {
        beatSound.playAsync();
      }, 200);

      setPlaying(true);
      
    } catch (err) {
      console.error(err);
    }
  };

  const stopAll = async () => {
    stopPlaying();
    stopRecording();
    setPlaying(false);
  };

  const stopPlaying = async () => {
    unloadBeat();
    unloadRecorded();
  };

  const stopRecording = async () => {
    if (!recording) return;
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setUri(uri);
    console.log('Recording stopped and stored at', uri);
  };

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

        <Text style={Styles.headerText}>
          Choose a beat
        </Text>

        <BeatScroller />

        <Text style={Styles.headerText}>
          Groove it!
        </Text>

        <Button
          primary
          raised
          text={recording ? 'Stop' : 'Record'}
          onPress={recording ? stopAll : playbackBeatAndRecord}
        />

        <Button
          primary
          raised
          text={playing ? 'Stop' : 'Play it back!'}
          onPress={playing ? stopAll : playBeatAndRecording}
        />
      
      </View>

      <StatusBar style='dark' backgroundColor='white' />
    </View>
  );
};

export default CreatePost;

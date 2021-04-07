import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView, View, Dimensions, Text } from 'react-native';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import Styles from '../../components/Styles';
import { Button } from 'react-native-material-ui';
import NavStyles from '../../components/NavStyles';
import { StatusBar } from 'expo-status-bar';
import Audio from '../../utils/Audio';
import BeatScroller from '../../components/posts/BeatScroller';

const window = Dimensions.get('window');
const [windowWidth, windowHeight] = [window.width, window.height];

// Styles specific to the create post menu.
const CreatePostStyles = StyleSheet.create({
  white: {
    backgroundColor: 'white'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: windowHeight - 175,
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
  const [beat, setBeat] = useState(false);

  // Properly clean up after ourselves to get rid of mem leaks.
  useEffect(() => {
    return () => {
      console.log('Unloading all sounds');
      stopPlaying();
    };
  }, []);

  // Play the selected beat back and record the user's audio.
  const playbackBeatAndRecord = async () => {
    try {

      if (!beat) return;

      // Prepare the recording
      console.log('Requesting permissions..');

      // Custom implementation to ask for perms and set config properly
      await Audio.setModeRecord();

      console.log('Starting recording..');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);

      // Prepare the audio session
      await unloadBeat();
      console.log('Playing beat');
      const beatSound = new Audio.Sound();
      await beatSound.loadAsync({ uri: beat });
      
      // Start recording and audio.
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

  // Unload the recorded track.
  const unloadRecorded = async () => {
    if (!recordedSound) return;
    console.log('Unloading recording');
    await recordedSound.unloadAsync();
    setRecordedSound(undefined);
  };

  // Unload the beat track.
  const unloadBeat = async () => {
    if (!beatSound) return;
    console.log('Unloading beat');
    await beatSound.unloadAsync();
    setBeatSound(undefined);
  };

  // Play back both audio files, as close together as possible.
  const playBeatAndRecording = async () => {
    try {
      if (!uri || !beat) return;

      // Custom implementation to set permissions.
      await Audio.setModePlayback();

      await unloadRecorded();
      const recordedSound = new Audio.Sound();
      await recordedSound.loadAsync({uri: uri});
      setRecordedSound(recordedSound);

      await unloadBeat();
      const beatSound = new Audio.Sound();
      await beatSound.loadAsync({ uri: beat });
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

  // Stop playing and recording.
  const stopAll = async () => {
    stopPlaying();
    stopRecording();
    setPlaying(false);
  };

  // Stop playing.
  const stopPlaying = async () => {
    unloadBeat();
    unloadRecorded();
  };

  // Stop recording a user's mic.
  const stopRecording = async () => {
    if (!recording) return;
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setUri(uri);
    console.log('Recording stopped and stored at', uri);
  };

  const updateBeat = (newBeat) => {
    setBeat(newBeat);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
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

        <BeatScroller updateBeat={updateBeat}/>

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
    </SafeAreaView>
  );
};

export default CreatePost;

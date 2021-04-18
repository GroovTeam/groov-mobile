import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView, View, Text, Alert } from 'react-native';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import Styles from '../../components/Styles';
import SafeViewAndroid from '../../components/SafeViewAndroid';
import { Button } from 'react-native-material-ui';
import NavStyles from '../../components/NavStyles';
import { StatusBar } from 'expo-status-bar';
import Audio from '../../utils/Audio';
import BeatScroller from '../../components/posts/BeatScroller';
import { windowWidth } from '../../utils/Dimensions';

// Styles specific to the create post menu.
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

const ChooseBeatAndRecord = ({ doneRecording }) => {

  const [recording, setRecording] = useState(undefined);
  const [recordingPath, setRecordingPath] = useState(undefined);
  const [recordedSound, setRecordedSound] = useState(undefined);
  const [beatSound, setBeatSound] = useState(undefined);
  const [recordDelay, setRecordDelay] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [beatURL, setBeatURL] = useState(undefined);
  const [beatPath, setBeatPath] = useState(undefined);
  const [beatName, setBeatName] = useState(undefined);

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

      if (!beatURL) {
        Alert.alert(
          'Hold up.',
          'Select a beat before recording!'
        );
        return;
      }

      // Prepare the recording
      console.log('Requesting permissions..');

      // Custom implementation to ask for perms and set config properly
      await Audio.setModeRecord();

      console.log('Starting recording..');
      const recording = new Audio.Recording();

      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_CUSTOM_HIGH_QUALITY);

      // Prepare the audio session
      await unloadBeat();
      console.log('Playing beat');
      const beatSound = new Audio.Sound();
      await beatSound.loadAsync({ uri: beatURL });
      
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
      if (!recordingPath || !beatURL) return;

      // Custom implementation to set permissions.
      await Audio.setModePlayback();

      await unloadRecorded();
      const recordedSound = new Audio.Sound();
      await recordedSound.loadAsync({uri: recordingPath});
      setRecordedSound(recordedSound);

      await unloadBeat();
      const beatSound = new Audio.Sound();
      await beatSound.loadAsync({ uri: beatURL });
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
    setRecordingPath(uri);
    console.log('Recording stopped and stored at', uri);
  };

  const updateBeat = (beatName, beatPath, beatURL) => {
    setBeatName(beatName);
    setBeatPath(beatPath);
    setBeatURL(beatURL);
  };

  const attach = () => {
    if (!recordingPath || !beatURL) {
      Alert.alert(
        'Hold up.',
        'Record something before finishing!'
      );
      return;
    }

    finishSession();
  };

  const finishSession = () => {
    doneRecording(beatName, beatPath, recordingPath);
  };

  return (
    <SafeAreaView style={[SafeViewAndroid.AndroidSafeArea, {flex: 1, backgroundColor: 'white'}]}>
      <NavBar style={NavStyles}>
        <NavTitle style={NavStyles.title}>
          {'Freestyle'}
        </NavTitle>
        <NavButton onPress={doneRecording}>
          <NavButtonText style={Styles.blueAccentText}>
            Cancel
          </NavButtonText>
        </NavButton>
      </NavBar>

      <View style={CreatePostStyles.container}>

      
        <Text style={Styles.headerText}>
          Choose a beat
        </Text>

        <BeatScroller updateBeat={updateBeat}/>

        <Button
          primary
          raised
          text={recording ? 'Stop' : 'Record'}
          onPress={recording ? stopAll : playbackBeatAndRecord}
        />

        <Button
          primary
          raised
          text={playing ? 'Stop' : 'Play it back'}
          onPress={playing ? stopAll : playBeatAndRecording}
        />

        <Button
          primary
          raised
          text={'Done'}
          onPress={attach}
        />
      
      </View>

      <StatusBar style='dark' backgroundColor='white' />
    </SafeAreaView>
  );
};

export default ChooseBeatAndRecord;

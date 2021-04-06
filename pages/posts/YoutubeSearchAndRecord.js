import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View, Dimensions, TextInput } from 'react-native';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import Styles from '../../components/Styles';
import InputStyles from '../../components/InputStyles';
import { Button } from 'react-native-material-ui';
import NavStyles from '../../components/NavStyles';
import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av';
import searchYoutube from '../../utils/searchYoutube';
// import ytdl from 'react-native-ytdl';
// import axios from 'axios';

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
    height: windowHeight - 100,
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
  const [searchQuery, setSearchQuery] = useState('');
  const [video, setVideo] = useState({});

  useEffect(() => {
    return () => {
      console.log('Unloading all sounds');
      stopPlaying();
    };
  }, []);

  const record = async () => {
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

  const searchYoutubeQuery = async () => {
    searchYoutube(searchQuery)
      .then(res => {
        const links = res.data;
        if (links) {
          console.log(links[0]);

        }
      })
      .catch(console.error);
    // ytdl(youtubeURL, {
    //   quality: 'highestaudio',
    //   filter: 'audioonly'
    // })
    //   .then(urls => {
    //     const url = urls[0].url;
    //     console.log(url);
    //     axios.get(url)
    //       .then(console.log);
    //   }).catch(console.error);
  };

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

  // Play back the stored uri sound
  const playRecorded = async () => {
    try {
      if (!uri) return;
      await unloadRecorded();
      console.log('Playing your sound');
      const recordedSound = new Audio.Sound();
      await recordedSound.loadAsync({uri: uri});
      setRecordedSound(recordedSound);
      await recordedSound.playAsync();
    } catch (err) {
      console.error('Failed to play your sound', err);
    }
  };

  const playBeat = async () => {
    try {
      await unloadBeat();
      console.log('Playing beat');
      const beatSound = new Audio.Sound();
      await beatSound.loadAsync(require('../../test_sounds/joey.mp3'));
      setBeatSound(beatSound);
      await beatSound.playAsync();
    } catch (err) {
      console.error('Failed to play your sound', err);
    }
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
      
    } catch (err) {
      console.error(err);
    }
  };

  const stopPlaying = async () => {
    unloadBeat();
    unloadRecorded();
  };

  const stopRecording = async () => {
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

        <View style={CreatePostStyles.spacer} />

        <TextInput
          style={InputStyles.textInput}
          placeholder={'Search a beat'}
          onChangeText={text => setSearchQuery(text)}
        />

        <View style={{marginTop: 10}} />
        
        <Button
          primary
          raised
          text={'Search Youtube'}
          onPress={searchYoutubeQuery}
        />

        <View style={CreatePostStyles.spacer} />

        <View>
          <Button
            primary
            raised
            text={recording ? 'Stop Recording' : 'Start Recording'}
            onPress={recording ? stopRecording : record}
          />

          <View style={CreatePostStyles.spacer} />

          <Button
            primary
            raised
            text={'Play Beat and record'}
            onPress={playbackBeatAndRecord}
          />

          <View style={CreatePostStyles.spacer} />

          <Button
            primary
            raised
            text={uri ? 'Play Recording' : 'No Recording Stored'}
            onPress={playRecorded}
          />

          <View style={CreatePostStyles.spacer} />

          <Button
            primary
            raised
            text={'Play Beat'}
            onPress={playBeat}
          />

          <View style={CreatePostStyles.spacer} />

          <Button
            primary
            raised
            text={'Play Beat and Recording'}
            onPress={playBeatAndRecording}
          />

          <View style={CreatePostStyles.spacer} />

          <Button
            primary
            raised
            text={'Stop Sounds'}
            onPress={stopPlaying}
          />
        
        </View>

      </View>
      <StatusBar style='dark' backgroundColor='white' />
    </View>
  );
};

export default CreatePost;

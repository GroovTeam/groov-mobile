import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import Audio from '../../utils/Audio';
import { Button } from 'react-native-material-ui';

/**
 * Playback menu for a post's beat
 * 
 * @param {String} beatPath A url to the specified beat (if it exists)
 * @param {String} dubPath A url to the specified beat (if it exists)
 * @returns 
 */
const PlaybackMenu = ({ beatPath, dubPath }) => {

  const [beat, setBeat] = useState(undefined);
  const [dub, setDub] = useState(undefined);

  useEffect(() => {
    return () => {
      unloadAll();
    };
  }, []);

  const unloadAll = async () => {
    await unloadBeat();
    await unloadDub();
  };

  const unloadDub = async () => {
    console.log('Unloading dub ' + dubPath);

    // Unload the beat track.
    if (!dub) return;
    await dub.unloadAsync();
  };

  const unloadBeat = async () => {
    console.log('Unloading beat ' + beatPath);

    // Unload the beat track.
    if (!beat) return;
    await beat.unloadAsync();
  };

  const playTogether = async () => {
    // Custom implementation to handle permissions for playback.
    await Audio.setModePlayback();

    playDub();
    playBeat();
  };

  const playDub = async () => {
    if (dub) {
      await dub.playAsync();
      return;
    }

    console.log('Loading dub ' + dubPath);
    const dub = new Audio.Sound();
    await dub.loadAsync({ uri: dubPath });
    setDub(dub);

    await dub.playAsync();
  };

  const playBeat = async () => {

    if (beat) {
      await beat.playAsync();
      return;
    }

    console.log('Loading beat ' + beatPath);
    const beat = new Audio.Sound();
    await beat.loadAsync({ uri: beatPath });
    setBeat(beat);

    await beat.playAsync();
  }; 

  const stopAll = async () => {
    await unloadAll();
  };

  return (
    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', margin: 5}}>
      <Button
        raised
        primary
        text='Play'
        onPress={playTogether}
      />
      <Button
        raised
        primary
        text='Stop'
        onPress={stopAll}
      />
    </View>
  );
};

export default PlaybackMenu;
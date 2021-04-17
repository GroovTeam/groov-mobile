import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Audio from '../../utils/Audio';
import { Ionicons } from '@expo/vector-icons';

const color = '#007bff';
const size = 35;

/**
 * Playback menu for a post's beat
 * 
 * @param {String} beatPath A url to the specified beat (if it exists)
 * @param {String} dubPath A url to the specified beat (if it exists)
 * @returns 
 */
const PlaybackMenu = ({ beatPath, dubPath }) => {

  const [beat, setBeat] = useState(new Audio.Sound());
  const [dub, setDub] = useState(new Audio.Sound());
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    return () => {
      unloadAll();
    };
  }, []);

  const unloadAll = async () => {
    await unloadBeat();
    await unloadDub();
  };
  
  const unloadBeat = async () => {
    // Unload the beat track.
    const beatStatus = await beat.getStatusAsync();

    if (beatStatus.isLoaded)
      await beat.unloadAsync();
  };

  const unloadDub = async () => {
    // Unload the dub track.
    const dubStatus = await dub.getStatusAsync();

    if (dubStatus.isLoaded)
      await dub.unloadAsync();
  };

  const play = async () => {
    // Custom implementation to handle permissions for playback.
    await Audio.setModePlayback();

    const beatStatus = await beat.getStatusAsync();
    const dubStatus = await dub.getStatusAsync();
    
    if (!beatStatus.isLoaded) {
      await beat.loadAsync({ uri: beatPath });
      setBeat(beat);
    }

    if (!dubStatus.isLoaded) {
      await dub.loadAsync({ uri: dubPath });
      await dub.setOnPlaybackStatusUpdate(handleDubPlaybackUpdate);
      setDub(dub);
    }

    beat.playAsync();
    dub.playAsync();

    setPlaying(true);
  };

  // Pause the audio
  const pause = async () => {
    await beat.pauseAsync();
    await dub.pauseAsync();

    setPlaying(false);
  };

  // Check to see if the audio is currently running, then stop and rewind
  const stopAndRewind = async () => {

    const beatStatus = await beat.getStatusAsync();
    const dubStatus = await dub.getStatusAsync();

    if (beatStatus.isLoaded && dubStatus.isLoaded) {
      await pause();
      beat.setPositionAsync(0);
      dub.setPositionAsync(0);
    }
  };

  // Tell the player to stop playing as soon as the dub finishes
  const handleDubPlaybackUpdate = async (dubStatus) => {
    if (dubStatus.didJustFinish)
      await stopAndRewind();
  };

  return (
    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', margin: 5}}>
      <TouchableOpacity onPress={stopAndRewind}>
        <Ionicons
          name={'play-skip-back-circle-outline'}
          color={color}
          size={size}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={playing ? pause : play}>
        <Ionicons
          name={playing ? 'stop-circle-outline' : 'play-circle-outline'}
          color={color}
          size={size}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PlaybackMenu;
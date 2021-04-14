import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import Audio from '../../utils/Audio';
import { Ionicons } from '@expo/vector-icons';

const color = '#007bff';

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
      setDub(dub);
    }

    beat.playAsync();
    dub.playAsync();

    setPlaying(true);
  };

  const stop = async () => {
    await beat.pauseAsync();
    await dub.pauseAsync();

    setPlaying(false);
  };

  const stopAndRewind = async () => {

    const beatStatus = await beat.getStatusAsync();
    const dubStatus = await dub.getStatusAsync();

    if (beatStatus.isLoaded && dubStatus.isLoaded) {
      await stop();
      beat.setPositionAsync(0);
      dub.setPositionAsync(0);
    }
  };

  return (
    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', margin: 5}}>
      <TouchableOpacity onPress={stopAndRewind}>
        <Ionicons
          name={'play-skip-back-circle-outline'}
          color={color}
          size={45}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={playing ? stop : play}>
        <Ionicons
          name={playing ? 'stop-circle-outline' : 'play-circle-outline'}
          color={color}
          size={45}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PlaybackMenu;
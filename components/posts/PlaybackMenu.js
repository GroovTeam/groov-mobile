import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import Audio from '../../utils/Audio';
import IconToggle from '../IconToggle';

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
  };

  const stop = async () => {
    await beat.pauseAsync();
    await dub.pauseAsync();
  };

  return (
    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', margin: 5}}>
      <IconToggle
        onActivate={play}
        onDeactivate={stop}
        onIcon={'stop-circle'}
        offIcon={'play-circle'}
        color={'#007bff'}
        size={45}
      />
    </View>
  );
};

export default PlaybackMenu;
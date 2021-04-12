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
    setDub(undefined);
  };

  const unloadBeat = async () => {
    console.log('Unloading beat ' + beatPath);

    // Unload the beat track.
    if (!beat) return;
    await beat.unloadAsync();
    setBeat(undefined);
  };

  const play = async () => {
    // Custom implementation to handle permissions for playback.
    await Audio.setModePlayback();

    let preppedDub = dub;
    let preppedBeat = beat;

    if (!preppedDub) {
      console.log('Loading dub ' + dubPath);
      preppedDub = new Audio.Sound();
      await preppedDub.loadAsync({ uri: dubPath });
      setDub(preppedDub);
    }

    if (!preppedBeat) {
      console.log('Loading beat ' + beatPath);
      preppedBeat = new Audio.Sound();
      await preppedBeat.loadAsync({ uri: beatPath });
      setBeat(preppedBeat);
    }

    preppedBeat.playAsync();
    preppedDub.playAsync();
  };

  const stop = async () => {
    await unloadAll();
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
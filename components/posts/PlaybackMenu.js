import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import Audio from '../../utils/Audio';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    return () => {
      unloadAll();
    };
  }, []);

  const unloadAll = async () => {
    await unloadBeat();
    await unloadDub();
    setPlaying(false);
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
    setPlaying(true);

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
      <TouchableOpacity onPress={playing ? stop : play}>
        <Ionicons
          name={playing ? 'md-stop-circle' : 'md-play-circle'}
          size={45}
          color='#007bff'
        />
      </TouchableOpacity>
    </View>
  );
};

export default PlaybackMenu;
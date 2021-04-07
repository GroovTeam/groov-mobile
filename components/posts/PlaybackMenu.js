import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import Audio from '../../utils/Audio';
import { Button } from 'react-native-material-ui';

/**
 * Playback menu for a post's beat
 * 
 * @param {String} beatPath A url to the specified beat (if it exists)
 * @returns 
 */
const PlaybackMenu = ({ beatPath }) => {

  const [beat, setBeat] = useState(undefined);

  useEffect(() => {
    return beat ? unloadBeat : undefined;
  }, [beat]);

  const unloadBeat = async () => {
    console.log('Unloading beat ' + beatPath);

    // Unload the beat track.
    if (!beat) return;
    await beat.unloadAsync();
  };

  const playBeat = async () => {

    // Custom implementation to handle permissions for playback.
    await Audio.setModePlayback();

    console.log('Loading beat ' + beatPath);
    const beat = new Audio.Sound();
    await beat.loadAsync({ uri: beatPath });
    setBeat(beat);

    await beat.playAsync();
  };

  const stopBeat = async () => {
    if (!beat) return;
    setBeat(undefined);
  };

  return (
    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', margin: 5}}>
      <Button
        raised
        primary
        text='Play'
        onPress={playBeat}
      />
      <Button
        raised
        primary
        text='Stop'
        onPress={stopBeat}
      />
    </View>
  );
};

export default PlaybackMenu;
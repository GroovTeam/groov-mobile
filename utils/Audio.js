import { Audio } from 'expo-av';

// Helper function to set us up for recording.
Audio.setModeRecord = async () => {
  await Audio.requestPermissionsAsync();
  await Audio.setAudioModeAsync({
    allowsRecordingIOS: true,
    playsInSilentModeIOS: true,
  }); 
};

// Helper method to set us up for playback.
Audio.setModePlayback = async () => {
  await Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    playsInSilentModeIOS: true
  });
};

export default Audio;
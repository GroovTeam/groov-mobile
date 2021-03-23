import React from 'react';
import { View } from 'react-native';
import Styles from '../components/Styles';
import { Button } from 'react-native-material-ui';

/**
 * Holds a suite of buttons to test various development tools
 */
const DevTools = ({ navigation, deleteSession }) => {

  const deleteAndReset = () => {
    deleteSession();
    navigation.navigate('Main', {
      resetSession: true,
    });
  };

  return (
    <View style={Styles.container}>
      <Button
        raised
        primary
        text='Delete Session'
        onPress={deleteAndReset}
      />
    </View>
  );
};

export default DevTools;
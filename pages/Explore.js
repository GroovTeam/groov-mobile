import React from 'react';
import { Text, View } from 'react-native';
import Styles from '../components/Styles';
 
/**
 * Explore page.
 * 
 * @param {Navigator} navigation 
 */
const Explore = () => {
  return (
    <View style={Styles.container}>
      <Text style={Styles.text}>
        Explore here!
      </Text>
    </View>
  );
};
 
export default Explore;
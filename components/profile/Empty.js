import React from 'react';
import { Text, View } from 'react-native';
import Styles from '../Styles';

const Empty = () => {
  return (
    <View style={Styles.container}>
      <Text style={{paddingHorizontal: 35, fontSize: 32, marginTop: 25, fontWeight: '200', textAlign: 'center'}}>Uh oh! Looks like there&apos;s nothing to show here :(</Text>
    </View>
  );
};

export default Empty;
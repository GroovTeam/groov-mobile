import React from 'react';
import { Text, View } from 'react-native';
import Styles from '../components/Styles';
 
const LoginSplash = () => {
  return (
    <View style={Styles.container}>
      <Text style={Styles.text}>
        User must Login
      </Text>
    </View>
  );
};

export default LoginSplash;
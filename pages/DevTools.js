import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Styles from '../components/Styles';
import Registration from './Registration';

const DevMessage = () => {
  return (
    <View style={Styles.container}>
      <Text style={Styles.text}>
        Swipe from the left to access dev menu.
      </Text>
    </View>
  );
};

// Create a stack to manage the user's open pages.
const Drawer = createDrawerNavigator();

/**
 * Holds a suite of buttons to test various development tools
 */
const DevTools = () => {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator>
        <Drawer.Screen name='Dev' component={DevMessage} />
        <Drawer.Screen name='Reg' component={Registration} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DevTools;
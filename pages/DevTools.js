import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native-material-ui';
import { Greeting, Likes, Dislikes, Neutrals } from './ExpoPages';
import { Styles } from '../components/ExpoComponents';

/**
 * General menu to aid in the development and testing process.
 * 
 * @param {Navigator} navigation 
 */
function DevSelector({ navigation }) {
  return (
    <View style={Styles.container}>
      <Button
        raised
        text='Test Registration Sequence'
        onPress={() => navigation.navigate('Greet')}
        />
    </View>
  );
}

// Create a stack to manage the user's open pages.
const Stack = createStackNavigator();

/**
 * Main application
 */
const DevTools = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name='Dev'      component={DevSelector} />
        <Stack.Screen name='Greet'    component={Greeting}    />
        <Stack.Screen name='Like'     component={Likes}       />
        <Stack.Screen name='Dislike'  component={Dislikes}    />
        <Stack.Screen name='Neutral'  component={Neutrals}    />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default DevTools;
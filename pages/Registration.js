import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Greeting from './Greeting';
import Name from './Name';
import Handle from './Handle'
import Likes from './Likes';
import Dislikes from './Dislikes';
import Neutrals from './Neutrals';
import RecallChosenGenres from './RecallChosenGenres';

// Create a stack to manage the user's open pages.
const Stack = createStackNavigator();

/**
 * Holds a suite of buttons to test various development tools
 */
const DevTools = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name='Greet'    component={Greeting} />
        <Stack.Screen name='Name'     component={Name} />
        <Stack.Screen name='Handle'   component={Handle} />
        <Stack.Screen name='Like'     component={Likes} />
        <Stack.Screen name='Dislike'  component={Dislikes} />
        <Stack.Screen name='Neutral'  component={Neutrals} />
        <Stack.Screen name='Recall'   component={RecallChosenGenres} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default DevTools;
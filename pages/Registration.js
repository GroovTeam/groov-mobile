import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Greeting from './Greeting';
import Name from './Name';
import Handle from './Handle';
import Email from './Email';
import Likes from './Likes';
import Dislikes from './Dislikes';
import Neutrals from './Neutrals';
import RecallChosenGenres from './RecallChosenGenres';
import PageBubble from '../components/PageBubble';

// Create a stack to manage the user's open pages.
const Stack = createStackNavigator();

/**
 * Holds a suite of buttons to test various development tools
 */
const DevTools = () => {
  // Current page index is stateful.
  const [curPage, setCurPage] = useState(0);


  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name='Greet'
          initialParams={{ processIndex: 0 }}  
        >
          {props => <Greeting {...props} updateCurPage={setCurPage} />}
        </Stack.Screen>
        <Stack.Screen name='Name'>
          {props => <Name {...props} updateCurPage={setCurPage} />}
        </Stack.Screen>
        <Stack.Screen name='Handle'>
          {props => <Handle {...props} updateCurPage={setCurPage} />}
        </Stack.Screen>
        <Stack.Screen name='Email'>
          {props => <Email {...props} updateCurPage={setCurPage} />}
        </Stack.Screen>
        <Stack.Screen name='Likes'>
          {props => <Likes {...props} updateCurPage={setCurPage} />}
        </Stack.Screen>
        <Stack.Screen name='Dislikes'>
          {props => <Dislikes {...props} updateCurPage={setCurPage} />}
        </Stack.Screen>
        <Stack.Screen name='Neutrals'>
          {props => <Neutrals {...props} updateCurPage={setCurPage} />}
        </Stack.Screen>
        <Stack.Screen name='Recall'>
          {props => <RecallChosenGenres {...props} updateCurPage={setCurPage} />}
        </Stack.Screen>
      </Stack.Navigator>
      <PageBubble
        numBubbles={8}
        index={curPage}
      />
    </NavigationContainer>
  );
};

export default DevTools;
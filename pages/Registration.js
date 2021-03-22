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
import PageBubble from '../components/PageBubble';

// Create a stack to manage the user's open pages.
const Stack = createStackNavigator();

/**
 * Holds a suite of buttons to test various development tools.
 * 
 * @param {Object} userData
 * @param {Callback} updateUserData updates the user's data in the callee
 * @param {Callback} applyRegistration tells the callee to apply registration
 * @param {Callback} cancelRegistration cancels a registration sequence
 */
const Registration = ({userData, updateUserData, applyRegistration, cancelRegistration}) => {
  // Current page index is stateful.
  const [curPage, setCurPage] = useState(0);  

  // The number of pages in registration. Userful for bubble rendering.
  const numPages = 7;

  const updateCurPage = (pageIndex) => {
    setCurPage(pageIndex);
  };

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>

        <Stack.Screen
          name='Greet'
          initialParams={{ pageIndex: 0 }}  
        >
          {props => <Greeting {...props}
            updateCurPage={updateCurPage}
            cancelRegistration={cancelRegistration}
          />}
        </Stack.Screen>

        <Stack.Screen name='Name'>
          {props => <Name {...props}
            userData={userData}
            applyUserData={updateUserData}
            updateCurPage={updateCurPage}
            cancelRegistration={cancelRegistration}
          />}
        </Stack.Screen>

        <Stack.Screen name='Handle'>
          {props => <Handle {...props}
            userData={userData}
            applyUserData={updateUserData}
            updateCurPage={updateCurPage}
            cancelRegistration={cancelRegistration}
          />}
        </Stack.Screen>

        <Stack.Screen name='Email'>
          {props => <Email {...props}
            userData={userData}
            applyUserData={updateUserData}
            updateCurPage={updateCurPage}
            cancelRegistration={cancelRegistration}
          />}
        </Stack.Screen>

        <Stack.Screen name='Likes'>
          {props => <Likes {...props}
            userData={userData}
            applyUserData={updateUserData}
            updateCurPage={updateCurPage}
            cancelRegistration={cancelRegistration}
          />}
        </Stack.Screen>

        <Stack.Screen name='Dislikes'>
          {props => <Dislikes {...props}
            userData={userData}
            applyUserData={updateUserData}
            updateCurPage={updateCurPage}
            cancelRegistration={cancelRegistration}
          />}
        </Stack.Screen>

        <Stack.Screen name='Neutrals'>
          {props => <Neutrals {...props}
            userData={userData}
            applyUserData={updateUserData}
            updateCurPage={updateCurPage}
            cancelRegistration={cancelRegistration}
            applyRegistration={applyRegistration}
          />}
        </Stack.Screen>

      </Stack.Navigator>
      <PageBubble
        numBubbles={numPages}
        index={curPage}
      />
    </NavigationContainer>
  );
};

export default Registration;
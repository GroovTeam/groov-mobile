import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Feed, Explore, Profile } from './ExpoPages';
import LoginOrRegister from './loginSequence/LoginOrRegister';
import VerifyEmail from './loginSequence/VerifyEmail';
import firebase from '../utils/Firebase';

/**
 * Main application.
 */
const Main = () => {

  const [initializing, setInitializing] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const onAuthStateChanged = (user) => {

    // Check if the user has verified their email.
    if (user) {
      setSignedIn(true);
      setEmailVerified(user.emailVerified);
    }
    else
      setSignedIn(false);

    if (initializing)
      setInitializing(false);
  };

  // Listen for auth state changes
  useEffect(() => {    
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  // Don't return anything if the app is initializing.
  // TODO: Loading screen.
  if (initializing)
    return null;

  // Allow the user to sign in.
  if (!signedIn)
    return <LoginOrRegister/>;

  // Check if the user's email is verified.
  if (!emailVerified)
    return <VerifyEmail setEmailVerified={setEmailVerified}/>;

  // Create a bottom tab navigator to manage pages.
  const BottomTabs = createBottomTabNavigator();

  return (
    <NavigationContainer independent={true}>
      {/* Dev Tab */}
      <BottomTabs.Navigator>
        {/* Feed Tab */}
        <BottomTabs.Screen
          name='Feed'
          component={Feed}
          options={{
            tabBarLabel: 'Feed',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name='home' color={color} size={size} />
            ),
          }}
        />
        {/* Explore Tab */}
        <BottomTabs.Screen
          name='Explore'
          component={Explore}
          options={{
            tabBarLabel: 'Explore',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name='magnify' color={color} size={size} />
            ),
          }}
        />
        {/* Profile Tab */}
        <BottomTabs.Screen
          name='Profile'
          component={Profile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name='account' color={color} size={size} />
            ),
          }}
        />
      </BottomTabs.Navigator>
    </NavigationContainer>
  );
};

export default Main;
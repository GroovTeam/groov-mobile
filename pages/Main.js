import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Feed, Explore, Profile } from './ExpoPages';
import LoginOrRegister from './loginSequence/LoginOrRegister';
import firebase from '../utils/Firebase';

/**
 * Main application.
 */
const Main = () => {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(undefined);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing)
      setInitializing(false);
  };

  useEffect(() => {    
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing)
    return null;

  // TODO: Make this screen display a loading icon
  if (!user)
    return <LoginOrRegister/>;

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
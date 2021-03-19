import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DevTools, Feed, Explore, Profile } from './pages/ExpoPages';
import LoginSplash from './pages/LoginSplash';
import recoverSession from './components/LoginUtils';

/**
 * Main application.
 */
const App = () => {

  // Our login is stateful.
  const [session, setSession] = useState(undefined);

  recoverSession()
    .then(session => {
      console.log(session);
      setSession(session);
    });
  
  // Create a bottom tab navigator to manage pages.
  const BottomTabs = createBottomTabNavigator();

  if (session === undefined)
    return <LoginSplash />;
      
  if (session === null)
    return <LoginSplash />;

  return (
    <NavigationContainer>
      {/* Dev Tab */}
      <BottomTabs.Navigator>
        <BottomTabs.Screen
          name='Dev'
          component={DevTools}
          options={{
            tabBarLabel: 'Dev',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name='cog' color={color} size={size} />
            ),
          }}
        />
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

export default App;
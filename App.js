import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DevTools from './test-suite/pages/DevTools';
import Feed from './test-suite/pages/Feed';
import Explore from './test-suite/pages/Explore';
import Profile from './test-suite/pages/Profile';

// Create a stack to manage the user's open pages.
const BottomTabs = createBottomTabNavigator();

/**
 * Main application
 */
const App = () => {
  return (
    <NavigationContainer>
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
}

export default App;
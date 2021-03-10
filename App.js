import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DevTools from './test-suite/pages/DevTools';

// Create a stack to manage the user's open pages.
const BottomTabs = createBottomTabNavigator();

/**
 * Main application
 */
const App = () => {
  return (
    <NavigationContainer>
      <BottomTabs.Navigator>
        <BottomTabs.Screen name='Dev' component={DevTools} />
      </BottomTabs.Navigator>
    </NavigationContainer>
  );
}

export default App;
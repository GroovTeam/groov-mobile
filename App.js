import React from 'react';
import Main from './pages/Main';
import DevTools from './pages/DevTools';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
/**
 * Main application.
 */
const App = () => {
  // Create a drawer for dev purposes.
  const Drawer = createDrawerNavigator();
  return(
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name='Main'
          component={Main}
          initialParams={{ resetSession: true }}
        />
        <Drawer.Screen name='Dev' component={DevTools} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
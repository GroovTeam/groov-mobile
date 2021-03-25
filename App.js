import React from 'react';
import Main from './pages/Main';
import DevTools from './pages/DevTools';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { deleteSession } from './utils/APIUtils';

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
        <Drawer.Screen name='Dev'>
          {props => <DevTools {...props}
            deleteSession={deleteSession}
          />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
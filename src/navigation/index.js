import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// FILES
import {Screens} from '../containers';

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="Home"
          component={Screens.Home}
          screenOptions={{
            headerShown: false,
          }}
        />
        {/* <Stack.Screen
          name="AdPost"
          component={Screens.AdPost}
          screenOptions={{
            headerShown: false,
          }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;

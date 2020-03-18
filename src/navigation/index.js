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
        <Stack.Screen name="Login" component={Screens.Login} />
        <Stack.Screen name="Home" component={Screens.Home} />
        <Stack.Screen name="FormExample" component={Screens.FormExample} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;

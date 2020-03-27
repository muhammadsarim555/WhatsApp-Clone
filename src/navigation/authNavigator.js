import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// FILES
import {Screens} from '../containers';

const Stack = createStackNavigator();

function AuthNavigaor() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={Screens.Login} />
        <Stack.Screen name="Verification" component={Screens.Verification} />
        <Stack.Screen name="SignUp" component={Screens.SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthNavigaor;

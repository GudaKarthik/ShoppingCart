import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';

const AuthStack = () => {


  const Stack = createNativeStackNavigator();


  return (
    
    // <NavigationContainer>
    
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
    
    // </NavigationContainer>
   
  );
}

export default AuthStack;
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import DashboardScreen from '../screens/DashboardScreen';
import ShoppingScreen from '../screens/ShoppingScreen';
import ShoppingItemScreen from '../screens/ShoppingItemScreen';
import AllProductsScreen from '../screens/AllProductsScreen';
import CartScreen from '../screens/CartScreen';
import CartItemsScreen from '../screens/CartItemsScreen';

 const AppStack = () => {


  const Stack = createNativeStackNavigator();


  return (
    
    // <NavigationContainer>
    
    <Stack.Navigator initialRouteName='Dashboard'>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Shopping" component={ShoppingScreen} />
      <Stack.Screen name='ShoppingItem'component={ShoppingItemScreen} />
      <Stack.Screen name='AllPR'component={AllProductsScreen} />
      <Stack.Screen name='Cart'component={CartScreen} />
      <Stack.Screen name='Cartitems' component={CartItemsScreen}/>
    </Stack.Navigator>
    
    // </NavigationContainer>
   
  );
}

export default AppStack;
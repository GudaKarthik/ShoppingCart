import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import DashboardScreen from './screens/DashboardScreen';
import ShoppingScreen from './screens/ShoppingScreen';
import ShoppingItemScreen from './screens/ShoppingItemScreen';
import CartScreen from './screens/CartScreen';
import AllProductsScreen from './screens/AllProductsScreen';
import CartProvider from './context/CartProvider';
import CartItemsScreen from './screens/CartItemsScreen';


export default function App() {


  const Stack = createNativeStackNavigator();


  return (
    <CartProvider>
    <NavigationContainer>
    
    <Stack.Navigator initialRouteName='Dashboard'>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Shopping" component={ShoppingScreen} />
      <Stack.Screen name='ShoppingItem'component={ShoppingItemScreen} />
      <Stack.Screen name='AllPR'component={AllProductsScreen} />
      <Stack.Screen name='Cart'component={CartScreen} />
      <Stack.Screen name='Cartitems' component={CartItemsScreen}/>
    </Stack.Navigator>
    </NavigationContainer>
    </CartProvider>
  );
}


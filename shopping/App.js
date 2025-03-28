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
import LoginScreen from './screens/LoginScreen';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import Store from './reduxStore/Store';

const App = () => {

  const Stack = createNativeStackNavigator();


  return (

    <Provider store={Store}>
    <CartProvider>

    <AppNavigator />

    </CartProvider>
    </Provider>
  );
}

export default App;
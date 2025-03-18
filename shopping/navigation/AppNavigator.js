import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View,ActivityIndicator } from 'react-native';
import { useContext } from 'react';
import { CartContext } from '../context/CartProvider';
import AuthStack from './AuthStack';
import AppStack from './AppStack';


const AppNavigator = () => {

  const {isLoading, userToken} = useContext(CartContext)

  if(isLoading){
    return(
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>

      <ActivityIndicator size={'large'} />

    </View>
    )
  }

  return (
    <NavigationContainer>
      {userToken !== null ? <AppStack /> : <AuthStack/>}
    </NavigationContainer>
  );
}

export default AppNavigator;
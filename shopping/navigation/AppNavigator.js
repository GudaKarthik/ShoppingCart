import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View,ActivityIndicator } from 'react-native';
import { useContext } from 'react';
import { CartContext } from '../context/CartProvider';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { useDispatch, useSelector } from 'react-redux';
import { loadToken } from '../login/loginSlice';


const AppNavigator = () => {

  const {isLoading, userToken} = useContext(CartContext)
  const dispatch = useDispatch()
  const { isLoggedIn, token } = useSelector((state => state.auth));

  useEffect(() => {
    dispatch(loadToken())
    console.log("The token is ",token)
  },[dispatch])

  // if(isLoggedIn){
  //   return(
  //   <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>

  //     <ActivityIndicator size={'large'} />

  //   </View>
  //   )
  // }
  if (token === null && token === "") {
  
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  // return (
  //   <NavigationContainer>
  //     {token !== null ? <AppStack /> : <AuthStack/>}
  //   </NavigationContainer>
  // );
  return (
    <NavigationContainer>
      {token ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default AppNavigator;
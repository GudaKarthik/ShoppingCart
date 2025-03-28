import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useContext, useEffect,useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { CartContext } from "../context/CartProvider";
import { useDispatch } from "react-redux";
import { login } from "../login/loginSlice";


const LoginScreen = () => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
  //  const { login } = useContext(CartContext)
    const navigation = useNavigation()
    const dispatch = useDispatch()


    return(
        <View>
            <Text style={{marginLeft:15,marginTop:15,fontWeight:'800',color:'#004a8e',fontSize:18}}>
                Login
            </Text>

            <Text style={{marginLeft:15,color:'black',fontWeight:'500',marginTop:20}}>Username</Text>

            <TextInput
            placeholder="Enter your name"
            style={{margin:15,backgroundColor:'lightgray',padding:10,borderRadius:15}}
            onChangeText={(text) => {
                setUserName(text)
            }}
            />

           <Text style={{marginLeft:15,color:'black',fontWeight:'500'}}>Password</Text>

           <TextInput
            placeholder="Enter your password"
            style={{margin:15,backgroundColor:'lightgray',padding:10,borderRadius:15}}
            onChangeText={(text) => {
                setPassword(text)
            }}
            />


            <TouchableOpacity style={{margin:15,backgroundColor:'green',borderRadius:15}}
            onPress={() => {
                // login(userName,password)
                console.log("Log button")
                dispatch(login({userName,password}));
            }}
            >
                <Text style={{padding:10,alignSelf:'center',color:'white'}}>
                    Log In
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default LoginScreen;

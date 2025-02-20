import React, { useEffect,useRef,useState } from "react";
import { View, Text, FlatList,Image,StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios"; 


const ShoppingItemScreen = ({route}) => {

    const [product,setProduct] = useState({})
    const { id } = route.params;
    const url = "https://fakestoreapi.com/products/" + id


    useEffect(() => {
        axios.get(url)
        .then((response) => {
            setProduct(response.data)
            console.log(JSON.stringify(response.data))
        })
        .catch((error) => {
            console.log(error)
        })
    },[])

    return(
        <View style={styles.container}>

            <Text style={styles.title}>{product.title}</Text>

            <Image source={{uri: product.image}}
            style={styles.image}/>

            <Text style={styles.price}>Price : {product.price}</Text>

            <TouchableOpacity style={styles.cartbutton}>
                <View>
                    <Text style={{alignSelf:'center',padding:10,color:'white'}}>Add to Cart</Text>
                </View>
            </TouchableOpacity>
       
        </View>
    )
}

export default ShoppingItemScreen;

const styles = StyleSheet.create({

    container:{
        flex: 1,
        justifyContent: 'top',
        backgroundColor:'white',
        width:'100%',
        height:"100%"
    },

    title: {
        marginTop:20,
        color:'black',
        fontWeight:'bold',
        fontSize:18,
        marginRight:20,
        marginLeft:20,
    },

    price :{
        marginTop:16,
        color:'black',
        fontWeight:'500',
        fontSize:18,
        marginLeft:20,
        marginTop:10
    },

    image:{
      
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:'60%',
        marginTop:20
    },

    cartbutton:{
        marginRight:20,
        marginLeft:20,
        marginTop:20,
        backgroundColor:'green'
    }

});

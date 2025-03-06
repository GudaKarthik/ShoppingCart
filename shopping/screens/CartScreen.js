import React from "react";
import { View, Text, FlatList,Image,TouchableOpacity,StyleSheet } from "react-native";
import { useContext } from "react";
import { CartContext } from "../context/CartProvider";

const CartScreen = () => {

    const { buyNowProduct } = useContext(CartContext);

    return (
        <View style={{flex:1,backgroundColor:'#f2f2fc'}}>

        <View style={styles.cartitem}>

         <Image
         source={{uri:buyNowProduct.image}}
         style={styles.image}

        />

        <View style={{flexDirection:'column',justifyContent:'space-between'}}>

       <View>
       <Text
       style={styles.title}
       >{buyNowProduct.title.substring(0,25)}</Text>

       <Text
       style={styles.price}
       >₹ {buyNowProduct.price}</Text>

       </View>


    </View>
    

</View>

<Text style={{fontSize:17,margin:10,fontWeight:'600'}}>Expected delivery by 23rd January</Text>

<TouchableOpacity style={styles.proceedtobuybg}>
        <Text style={styles.proceedtobuyText}>
            Proceed To Buy
        </Text>
    </TouchableOpacity>

        </View>
    )
}

export default CartScreen;

const styles = StyleSheet.create({
    cartitem:{
        flexDirection:'column',
        margin:10,
        backgroundColor:'white',
        borderRadius:15,borderWidth:0.5,
        borderColor:'lightgray'
    },
    title: {
        color:'black',
        fontWeight:'bold',
        fontSize:17,
        marginTop:15,
        alignSelf:'center'
    },
    price :{
        color:'black',
        fontWeight:'600',
        fontSize:17,
        marginTop:15,
        alignSelf:'center',
        marginBottom:15
    },
    image:{
        alignSelf:'center',
        width:170,
        height:170,
        marginTop:15
    },

    proceedtobuybg : {
        backgroundColor:'green',
        borderRadius:30,
        margin:10
    },

    proceedtobuyText : {
        fontSize:15,
        fontWeight:'500',
        color:'white',
        alignSelf:'center',
        padding:10
    }
})
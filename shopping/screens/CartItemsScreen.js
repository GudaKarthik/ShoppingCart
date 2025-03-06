import React from "react";
import { View, Text, FlatList,Image,TouchableOpacity,StyleSheet } from "react-native";
import { useContext,useState } from "react";
import { CartContext } from "../context/CartProvider";

const CartItemsScreen = () => {

    const { cart } = useContext(CartContext);

    console.log("Cart Items " + JSON.stringify(cart));

    return(
        <View>
            <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
                <CartItem item={item} />
            )}
            >

            </FlatList>
        </View>
    )
}

export default CartItemsScreen;

const CartItem = ({item}) => {

    const { deleteProduct } = useContext(CartContext)

    return(
       <View>
        <View style={styles.cartitem}>
            <Image
            source={{uri:item.image}}
            style={styles.image}
            />
            <View>
                <Text style={styles.title}>{item.title.substring(0,24)}</Text>
                <Text style={styles.price}>₹ {item.price}</Text>
                <Text style={styles.quantity}>Quantity {item.quantity}</Text>
            </View>

            <Text style={styles.removeItem}
            onPress={() => {
                deleteProduct(item)
            }}
            >X</Text>

        </View>
       </View>
    )
}

const styles = StyleSheet.create({
    cartitem:{
        flexDirection:'row',
        marginTop:10,
        marginLeft:10,
        marginRight:10,
        backgroundColor:'white',
        borderRadius:15,borderWidth:0.5,
        borderColor:'lightgray',
        justifyContent:'space-between'
    },

    cartview:{
        backgroundColor:'white'
    },

    title: {
        color:'black',
        fontWeight:'bold',
        fontSize:17,
        marginTop:15,
    },
    price :{
        color:'black',
        fontWeight:'600',
        fontSize:17,
        marginTop:15,
    },
    image:{
        width:100,
        height:100,
        marginTop:15,
        marginLeft:15,
        marginBottom:15
    },
    quantity:{
        fontSize:13,
        fontWeight:'400',
        marginTop:15
    },

    removeItem : {
        marginRight:10,
        marginTop:15,
        color:'red',
        fontWeight:'bold',
    }
})
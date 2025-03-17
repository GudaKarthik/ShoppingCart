import React, { useEffect, useMemo } from "react";
import { View, Text, FlatList,Image,TouchableOpacity,StyleSheet } from "react-native";
import { useContext,useState } from "react";
import { CartContext } from "../context/CartProvider";

const CartItemsScreen = () => {

    const { cart, deleteProduct ,totalPrice, getTotalPrice } = useContext(CartContext);

    const [price,setPrice] = useState(0)
    const [pricevisibility, setPriceVisibility ] = useState(true)


    useEffect(() => {

        if(cart.length == 0){
            setPriceVisibility(false)
        }

        cart.map((item) => {
          setPrice((prev) => prev+item.price);
        })
        console.log("Cart Items are " + JSON.stringify(cart))
    },[cart,pricevisibility])

    return(
        <View>

            <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
                <CartItem item={item}
                deleteProducts={() => {
                    deleteProduct(item)
                    setPrice(0)
                }}
                 />
            )}
            >

            </FlatList>

            <View style={[styles.priceview,{display : pricevisibility ? 'flex' : 'none'}]}>

            <Text style={styles.textTotalprice}>Total Price</Text>
            
            <Text style={styles.totalPrice}>₹ {price} {getTotalPrice}</Text>

            </View>

        </View>
    )
}

export default CartItemsScreen;

const CartItem = ({item,deleteProducts}) => {

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
                deleteProducts()
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
    },

    priceview : {
        flexDirection:'row',
        justifyContent:'space-between'
    },

    textTotalprice : {
        fontSize:17,
        marginLeft:10,
        marginTop:10
    },

    totalPrice : {
        marginTop:10,
        marginRight:10,
        fontSize:17,
        fontWeight:'bold'
    }
})
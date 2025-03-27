import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView, Alert,TouchableOpacity, TextInput, Image } from "react-native";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import CategoryDashboard from "./helperComponents/CategoryDashboard";
import { useContext } from "react";
import { CartContext } from "../context/CartProvider";

const DashboardScreen = () => {

    const navigation = useNavigation();
    const url = "https://fakestoreapi.com/products";
    const [products, setProducts] = useState([]);
    const [limit, setLimit] = useState(5)
    const { cart,logout } = useContext(CartContext);
    const [cartButton,showCartButton] = useState(false);

    // Fetching Data from API
    useEffect(() => {

      if(cart.length > 0){
        console.log("Cart Items are there")
        showCartButton(true);
      }else{
        console.log("Cart Items are not there")
        showCartButton(false);
      }

        axios.get(url,{
          params: {
            "limit":limit
          }
        })
        .then((response) => {
       //     console.log("The data is " + JSON.stringify(response.data));
            setProducts(response.data);
        })
        .catch((error) => {
            console.log("The error is " + error);
        });
    },[limit,cart]);

  return (
    <View style={styles.container}>

      <ScrollView>

      <Text style={styles.offerText}>Big Sale is live! 50% Off on any item above ₹ 199</Text>
      
      {/* Category Dashboard */}
      <CategoryDashboard />

       {/* Go to Cart button */}
       <TouchableOpacity style={[styles.gotCartbtn,{display: cartButton ? 'flex' : 'none'}]}
       onPress={() => {
        navigation.navigate("Cartitems")
       }}
       >
        <Text style={styles.cartText}>
          Go to Cart items are waiting
        </Text>
      </TouchableOpacity>
      
      {/* Limited Shopping Items */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <LimitedProductItem
          navigation={navigation}
          item={item}
          />
        )}
      />

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutbtn} onPress={() => {
        logout()
      }}>
        <Text style={styles.logoutText}>
          Log Out
        </Text>
      </TouchableOpacity>
      
</ScrollView>
    </View>
  );
}


export default DashboardScreen;

const LimitedProductItem = ({navigation,item}) => {
  return(
    <View>
      <TouchableOpacity onPress={() => {
            navigation.navigate('ShoppingItem',{
              id : item.id,
              category : item.category
            })}
          }>
          <View style={styles.morelikeProductitem}>

            {/* Product Image */}
            <Image source={{uri:item.image}}
            style={styles.morelikeProductimage}></Image>

            {/* Product Title and Price */}
            <View style={styles.titleprice_bg}>

            {/* Title */}
            <Text style={styles.productTitle}>{item.title}</Text>
            
            {/* Price */}
            <Text style={styles.productPrice}>For ₹{item.price}</Text>

            </View>
          </View>
          </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({

  container: {
      flex: 1,
      backgroundColor: '#f2f2fc',
      alignItems: 'center',
      justifyContent: 'center',
  },

  offerText : {
    margin:10,
    borderColor:'#0096FF',
    borderWidth:3,
    borderRadius:15,
    padding:10,
    backgroundColor:'',
    color:'#0096FF',
    fontWeight:'bold',
    fontSize:14
  },

  morelikeProductitem:{
    padding: 0 ,
    backgroundColor: 'white', 
    marginLeft:6,
    marginRight:6,
    marginTop:10,
    borderRadius: 20,
    borderWidth:0.5,
    borderColor:'lightgray'
  },

  morelikeProductimage:{
    width:80,
    height:80,
    alignSelf:'center',
    marginTop:10
  },

  titleprice_bg: {
    marginTop:10,
    backgroundColor:'#E1C16E',
    borderBottomRightRadius:20,
    borderBottomLeftRadius:20
  },

  productTitle : {
    marginTop:10,
    marginRight:10,
    marginLeft:10,
    marginBottom:5,
    alignSelf:'center',
    fontSize:15,
    fontWeight:'400'
  },

  productPrice : {
    alignSelf:'center',
    marginTop:5,
    fontWeight:'700',
    marginBottom:10
  },
  gotCartbtn : {
    backgroundColor:'#00C000',
    borderRadius:20,
    padding:5,
    marginRight:10,
    marginTop:10,
    marginLeft:10
    
},
cartText : {
    padding:10,
    color:'white',
    fontWeight:'700',
    alignSelf:'center'
},

logoutbtn : {
  marginLeft:15,
  marginRight:15,
  marginTop:15,
  marginBottom:25,
  backgroundColor : 'red',
  borderRadius:20
},
logoutText : {
  color:'white',
  fontWeight:'700',
  alignSelf:'center',
  padding:10
}
});
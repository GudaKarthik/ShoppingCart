import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView, Alert,TouchableOpacity, TextInput, Image } from "react-native";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import CategoryDashboard from "./helperComponents/CategoryDashboard";

const DashboardScreen = () => {

    const navigation = useNavigation();
    const url = "https://fakestoreapi.com/products";
    const [products, setProducts] = useState([]);
    const [limit, setLimit] = useState(5)

    // Fetching Data from API
    useEffect(() => {
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
    },[limit]);

  return (
    <View style={styles.container}>
      <ScrollView>

      <Text style={styles.offerText}>Big Sale is live! 50% Off on any item above ₹ 199</Text>
      
      {/* Category Dashboard */}
      <CategoryDashboard />

      
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
    borderColor:'white',
    borderWidth:3,
    borderRadius:15,
    padding:10,
    backgroundColor:'orange',
    color:'white',
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
    backgroundColor:'#fff880',
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
  }
});
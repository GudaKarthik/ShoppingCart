import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView, Alert,TouchableOpacity, TextInput } from "react-native";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

const DashboardScreen = () => {

    const navigation = useNavigation();
    const url = "https://fakestoreapi.com/products";
    const [products, setProducts] = useState([]);

    const [dashboard, setDashboard] = useState([
        { id: 1, title: "All",image:"" },
        { id: 2, title: "Electronics",image:"" },
        { id: 3, title: "Jewellery",image:"" },
        { id: 4, title: "Men",image:"" },
        { id: 5, title: "Women",image:"" },
        { id: 6, title: "Saved",image:"" },
    ]);
    

    // Fetching Data from API
    useEffect(() => {
        axios.get(url,{
          params: {
            "limit":5
          }
        })
        .then((response) => {
            console.log("The data is " + JSON.stringify(response.data));
            setProducts(response.data);
        })
        .catch((error) => {
            console.log("The error is " + error);
        });
    },[]);

  return (
    <View style={styles.container}>
      <ScrollView>

      <Text style={{margin:10}}>This is a Shopping Cart you can shop anything.</Text>

      {/* Dashboard Items */}
      <FlatList
      data={dashboard}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => 
        {
          if(item.title == "All"){
            navigation.navigate('Shopping',{
              category : "All"
            });
          }else if(item.title == "Electronics"){
            navigation.navigate('Shopping',{
              category : "electronics"
            });
          }else if(item.title == "Jewellery"){
            navigation.navigate('Shopping',{
              category : "jewelery"
            });
          }else if(item.title == "Men"){
            navigation.navigate('Shopping',{
              category : "men's clothing"
            });
          }else if(item.title == "Women"){
            navigation.navigate('Shopping',{
              category : "women's clothing"
          })
        }
      }
        }>
        <View style={{ padding: 10 ,backgroundColor: '#004a8e', margin: 5,borderRadius: 10}}>
          <Text style={{color:'white'}} >{item.title}</Text>
        </View>
        </TouchableOpacity>
      )}
      />
      
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {
            navigation.navigate('ShoppingItem',{
              id : item.id
            })}
          }>
          <View style={{ padding: 10 ,backgroundColor: 'lightblue', margin: 5,borderRadius: 10}}>
            <Text>{item.title}</Text>
          </View>
          </TouchableOpacity>
        )}
      />
</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default DashboardScreen;
import React, { useEffect,useState } from "react";
import { View, Text, FlatList } from "react-native";
import axios from "axios";

const ShoppingScreen = ({route}) => {

    const { category } = route.params;

    let url = "";
    
    const [products, setProducts] = useState([]);

    useEffect(() => {

        if(category != "All"){
            url = "https://fakestoreapi.com/products/category/" + category;
        }else{
            url = "https://fakestoreapi.com/products";
        }

        axios.get(url)
        .then((response) => {
            console.log("The category " + JSON.stringify(response.data));
            setProducts(response.data);
        })
        .catch((error) => {
            console.log("The error is " + error);
        });
    },[]);

    return (
        <View>
            <Text>Shopping Screen</Text>

            <Text>Category : {category}</Text>

            <FlatList
            data={products}
            renderItem={({ item }) => (
                <View style={{borderWidth:0.5,borderColor:'lightgray',margin:5,padding:10,borderRadius:5,backgroundColor:'lightblue'}}>
                    <Text>{item.title}</Text>
                </View>
            )}
            />

        </View>
    );
 }

export default ShoppingScreen;
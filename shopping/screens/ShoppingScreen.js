import React, { useEffect,useRef,useState,useNavigation, useMemo, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert,Image, ScrollView, TextInput, StyleSheet } from "react-native";
import axios from "axios";
import { CartContext } from "../context/CartProvider";

const ShoppingScreen = ({route,navigation}) => {

    let url = ""
    // Category
    const { category } = route.params;

    // Products
    const [products, setProducts] = useState([]);

    // Filtered Products
    const [filterProducts,setFilterProducts] = useState()

    // Products Categories
    const [categories,setCategories] = useState([
            { id: 1, title: "All",image:"" },
            { id: 2, title: "electronics",image:"" },
            { id: 3, title: "jewelery",image:"" },
            { id: 4, title: "men's clothing",image:"" },
            { id: 5, title: "women's clothing",image:"" }
        ]);

    // Category Value
    const [categoryValue,setCategoryValue] = useState(false)

    // Search Value
    const [search, setSearch] = useState('')

    // Products API
    useEffect(() => {

        if(category != "All"){
            // Products Based on Category
            url = "https://fakestoreapi.com/products/category/" + category;
        }else{
            // All Products
            setCategoryValue(true)
            url = "https://fakestoreapi.com/products";
        }
        axios.get(url)
        .then((response) => {
            setProducts(response.data);
            setFilterProducts(response.data)
            console.log("Hitting")
        })
        .catch((error) => {
            console.log("The error is " + error);
        });
    },[category]);


    // Filter Products based on category
    const filterItems = (items) => {
        if(items == "All"){
            setFilterProducts(products)
        }else{
            const filteredData = products.filter((item) => item.category == items)
            setFilterProducts(filteredData)
        }
    }

    // Search products based on product name
    const searchFilterFunction = () => {
        if(search){  
            const newData = products.filter(item => {
                const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
                const textData = search.toUpperCase();
                console.log(" Itemdata " + itemData)
                return itemData.includes(textData)
            })
            console.log(" Product " + newData)
            
            setFilterProducts(newData);
        } else {
            setFilterProducts(products);
        }
    }

    // UI Component
    return (
        <View style={styles.container}>
            
            <ScrollView style={{flex:1}}>

            <View
            style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}
            >

            {/* Search Products     */}
            <TextInput
            placeholder="Enter product name"
            style={styles.searchbackground}
            onChangeText={(text) => {
                setSearch(text)
            }}
            />    

            {/* Search Button */}
            <TouchableOpacity
            style={styles.searchbutton}
            onPress={() => {
                searchFilterFunction()
            }}
            >

            <Text style={styles.searchText}>🔍</Text>
            </TouchableOpacity>
            </View>
            
            {/* Filters based on category */}
            <FlatList
            style={{display: categoryValue ? 'flex' : 'none',marginLeft:5,marginRight:5}}
            horizontal={true}
            data={categories}
            renderItem={({item})=> (
                <CategoryBasedFilters item={item}
                filterItems={() => {
                    filterItems(item.title)
                }} /> 
            )}
            ></FlatList>

            {/* Products List */}
            <FlatList
            data={filterProducts}
            contentContainerStyle={{ paddingBottom: 30 }}
            numColumns={2}
            renderItem={({item}) =>(
                
                <ProductItem props={item}
                navigation={navigation}
               
                />
            )}
            />

</ScrollView>
        </View>
    );
 }

// Category Bases Filters
const CategoryBasedFilters = ({item,filterItems}) => {
    return (
        <View>
            <TouchableOpacity
                onPress={() => {
                    // Filtering Products
                    filterItems()
                }}
                style={styles.categoryFiltersBackground}>
                    <View style={styles.categoryFiltersView}>
                        <Text style={styles.categoryFiltersText}>{item.title}
                        </Text>
                    </View>
                </TouchableOpacity>
        </View>
    )
}

//  Single Product Item
 const ProductItem = ({props,navigation}) => {

    const [count, setCount] = useState(0)
    const [counter,showCounter] = useState(false)
    const { addProduct,deleteProduct,increment,cartItemCount, incrementCartCount, decrementCartCount,addToCart } = useContext(CartContext);

    const counts = cartItemCount[props.id] || 0

    useEffect(() => {
        if(counts != 0){
            showCounter(true)
        }else{
            showCounter(false)
        }
    })

    return(
        <View
        style={styles.productItem_bg}>
               
            
            <TouchableOpacity
            onPress={() => {
                navigation.navigate('ShoppingItem',{
                    id : props.id,
                    category : props.category,
                    counterValue : count
                  })
            }}
            >
                    {/* Product Image */}
                     <Image
                     source={{uri:props.image}}
                     style={styles.productitemImage}
                     
                     />

                     <View style={{width:'100%',height:'0.1%',backgroundColor:'black',marginTop:10}}></View>

                     {/* Product Title */}
                     <Text style={styles.productItemTitle}>{props.title.substring(0,15)}</Text>

                     {/* Product Price */}
                     <Text style={styles.productItemPrice}
                     >₹ {props.price}</Text>

                     {/* Add To Cart */}
                     <TouchableOpacity
                     onPress={() => {
                        // addProduct()
                        incrementCartCount(props.id)
                         showCounter(true)
                    //    setCount(count + 1)
                     }}
                     style={[styles.addToCart_bg,{display: counter ? 'none' : 'flex'}]}>
                        <Text style={styles.addToCartText}>Add</Text>
                     </TouchableOpacity>

                     {/* Counter To Add Products and Remove Products */}
                     <View style={[styles.counter_bg,{display: counter ? 'flex' : 'none'}]}>

                        {/* Decrement Product */}
                         <Text
                         onPress={() => { 
                            if(count == 1){
                                showCounter(false)
                                setCount(0)
                            }else{
                                decrementCartCount(props.id)
                                // deleteProduct()
                            //   setCount((prev) => prev - 1)
                            }
                         }}
                         style={styles.counterTextValue}>-</Text>

                         {/* Counter Value */}
                         <Text style={styles.counterTextValue}>{counts}</Text>

                         {/* Increment Product */}
                         <Text
                         onPress={() => {
                            // addProduct(props.id)
                         //   setCount((prev) => prev+1)
                         incrementCartCount(props.id)
                         props["quantity"] = counts
                         addToCart(props)
                         }}
                         style={styles.counterTextValue}>+</Text>

                         

                     </View>
                     </TouchableOpacity>
                 </View>
    )

 }

export default ShoppingScreen;

const styles = StyleSheet.create({
    container : {
        height:'100%',
        backgroundColor:'#F7D6D0'
    },

    searchbackground : {
        backgroundColor:'white',
        padding:10,
        marginLeft:10,
        marginTop:10,
        borderRadius:10,
        width:'80%'
    },

    searchbutton : {
        backgroundColor:'#DFE8F1'
        ,marginRight:20,
        marginTop:10,
        borderRadius:10
    },

    searchText : {
        marginTop:10,
        paddingRight:10,
        paddingLeft:10
    },

    categoryFiltersBackground : {
        backgroundColor:'gray',
        marginLeft:4,
        marginRight:4,
        marginTop:10,
        borderRadius:10,
        marginBottom:5
    },

    categoryFiltersText : {
        padding:10,
        color:'white'
    },

    categoryFiltersView : {
        flex:'1',
        flexDirection:'row'
    },

    productItem_bg : {
        borderWidth:0.5,
        borderColor:'lightgray',
        margin:5,padding:10,
        borderRadius:15,
        backgroundColor:'white',
        flex:1,
        justifyContent:'space-evenly'
    },

    productitemImage : {
        width:80,
        height:80,
        alignSelf:'center',
        marginTop:10
    },

    productItemTitle : {
        marginLeft:10,
        marginTop:10
    },

    productItemPrice : {
        marginLeft:10,
        marginTop:10,
        fontWeight:'700'
    },

    addToCart_bg:{
        borderColor:'#004a8e',
        borderRadius:10,
        borderWidth:1,
        marginTop:10
    },
    addToCartText : {
        alignSelf:'center',
        padding:7,
        color:'#004a8e',
        fontWeight:'600'
    },

    counter_bg : {
        flexDirection:'row',
        marginTop:10,
        justifyContent:'space-between',
        backgroundColor:'#DFE8F1'
    },

    counterTextValue: {
        padding:5,
        fontWeight:'bold'
    }


})
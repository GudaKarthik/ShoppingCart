import React, { useEffect,useRef,useState,useMemo, use, useContext } from "react";
import { View, Text, FlatList,Image,StyleSheet, TouchableOpacity, Alert, ScrollView,Dimensions } from "react-native";
import axios from "axios"; 
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "../context/CartProvider";

const screenHeight = Dimensions.get('window').height;


const ShoppingItemScreen = ({route}) => {

    const navigation = useNavigation()
    const [product,setProduct] = useState({})
    const [cartItem, setCartItem] = useState({})
    const { id,category, counterValue } = route.params;
    const url = "https://fakestoreapi.com/products/" + id
    const categoryUrl = 'https://fakestoreapi.com/products/category/' + category
    const [price,setPrice] = useState()
    const [value,setValue] = useState(false)
    
    const [limitedProducts,setLimitedProducts] = useState([])

    const [counter,showCounter] = useState(false)
    const [count, setCount] = useState(1)
    // Use Context Values
    const { cart, addItem,addToCart } = useContext(CartContext);


    // Total Price
    const totalprice = useMemo(() => calculatePrice(price,count),[price,count])

    // Calcluating Price
    function calculatePrice(price,quantity) {
        return price * quantity
    }

    // Product Item
    useEffect(() => {

        if(counterValue){
            showCounter(true)
            setCount(counterValue)
        }

        // Product Details
        axios.get(url)
        .then((response) => {
            setValue(true)
            setProduct(response.data)
            // Filtering only 'Electronics' category
        const filteredProducts = cart.find(item => item.id === response.data.id);

        console.log("Filtered Products " + JSON.stringify(filteredProducts));
            setPrice(response.data.price)
            setQuanity(1)
        })
        .catch((error) => {
            console.log(error)
        })

        // Getting Limited Products
        axios.get(categoryUrl)
        .then((response) => {
            setLimitedProducts(response.data)
            
        })
        .catch((error) => {
            console.log(error)
        })


    },[cartItem])

    // Remove the product if exist
    const filteredProducts = useMemo(() => {
        if (!product) return limitedProducts;
        return limitedProducts.filter(item => item.title !== product.title);
    }, [product, limitedProducts]);


    // UI Component
    return(
        <ScrollView 
        style={{flex:1,backgroundColor:'#f2f2fc'}}
        >
        <View>
           
            {value ? (
        
            <View >

            {/* Product Title */}
            <Text style={styles.title}>{product.title}</Text>

            {/* Product Image */}
            <Image source={{uri: product.image}}
            style={styles.image}/>

            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            
            {/* Price */}
            <Text style={styles.price}>Price : ₹{totalprice}</Text>
            
            </View>

            {/* Buy Now Button */}
            <TouchableOpacity style={[styles.buybutton]}
            onPress={() => {
                addItem(product)
            
                navigation.navigate('Cart')
            }}
            >
                <View>
                    <Text style={styles.buyNowText}>Buy Now</Text>
                </View>
            </TouchableOpacity>

            {/* Add To Cart Button */}
            <TouchableOpacity style={[styles.cartbutton,{display:!counter ? 'flex' : 'none'}]}
            onPress={() => {
                showCounter(true)
                setCount(count)
                
                addToCart(product)
            }}
            >
                <View>
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                </View>
            </TouchableOpacity>

            {/* Increment and Decrement */}
                <View style={[styles.counterBackground,{display: counter ? 'flex' : 'none'}]}>

                    {/* Decrement Value */}
                    <TouchableOpacity
                    onPress={() =>{
                        setCount((prev) => prev - 1)
                        if(count == 1){
                            showCounter(false)
                            setCount(1)
                        }
                    }}
                    >
                    <Text style={styles.decrementText}>-</Text>
                    </TouchableOpacity>

                    {/* Counter Value */}
                    <Text style={styles.counterText}>{count}</Text>

                    {/* Increment Value */}
                    <TouchableOpacity
                    onPress={() =>{
                        setCount((prev) => prev + 1)
                    }}
                    >
                    <Text style={styles.incrementText}>+</Text>
                    </TouchableOpacity>

                </View>

                {/* Go to Cart */}
                <TouchableOpacity style={[styles.gotCartbtn,{display: counter ? 'flex' : 'none'}]}
                onPress={() => {
                    product["quantity"] = count
                    setProduct(product)
                    console.log("Product "+ JSON.stringify(product))
                    navigation.navigate("Cartitems")
                }}>
                    <Text style={styles.cartText}>Go to Cart</Text>
                </TouchableOpacity>

                {/* Description */}     
                  <Text style={styles.description}>Description</Text>

                  {/* Product Description */}
                  <Text style={styles.productDescription}>{product.description}</Text>

                  {/* More Like This */}
                  <Text style={styles.morelikethistext}>More Like this</Text>
                  
                  {/* More Like This Products */}
                  <ScrollView style={{flex:1,flexDirection:'row'}}>
                  <FlatList
                  style={{marginLeft:10}}
                  data={filteredProducts}
                  horizontal={true}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({item}) =>(
                    <MoreLikeThisProducts
                    item={item}
                    navigation={navigation}
                    />
                
                )}
                  />
                  </ScrollView>
                  
            </View>
            ): (
            <Text >Loading....</Text>
            )}
            
        </View>
        </ScrollView>
    )
}

export default ShoppingItemScreen;

// More Like This Products
const MoreLikeThisProducts = ({item,navigation}) => {
    return (
        <View style={styles.morelikeProductitem}>  
            <TouchableOpacity
            onPress={() => {
                navigation.push('ShoppingItem',{
                    id : item.id,
                    category : item.category
                  })
            }}
            >
            <Image
            source={{uri:item.image}}
            style={styles.morelikeProductimage}
                                 
             />
            
             <View style={{width:'100%',height:'0.1%',backgroundColor:'black',marginTop:10}}></View>
            
             <Text style={styles.morelikeProductTitle}>{item.title.substring(0,15)}</Text>
            
             <Text style={styles.morelikeProductPrice}
             >₹ {item.price}</Text>
            
            </TouchableOpacity>
        </View>    
    )
}

const styles = StyleSheet.create({

    container:{
        flex: 1,
        justifyContent: 'top',
        backgroundColor:'white',
    },

    title: {
        marginTop:20,
        color:'black',
        fontWeight:'bold',
        fontSize:17,
        marginRight:20,
        marginLeft:20,
    },

    price :{
        marginTop:16,
        color:'black',
        fontWeight:'500',
        fontSize:18,
        marginLeft:20,
        marginTop:15
    },

    image:{
      
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height: screenHeight * 0.5,
        resizeMode:'cover',
        marginTop:20
    },

    cartbutton:{
        marginRight:20,
        marginLeft:20,
        marginTop:20,
        backgroundColor:'green',
        borderRadius:15
    },

    buybutton:{
        marginRight:20,
        marginLeft:20,
        marginTop:20,
        backgroundColor:'#004a8e',
        borderRadius:15
    },
    buyNowText:{
        alignSelf:'center',
        padding:10,
        color:'white',
        fontWeight:'bold'
    },
    addToCartText : {
        alignSelf:'center',
        padding:10,
        color:'white',
        fontWeight:'bold'
    },
    
    counterBackground : {
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'white',
        borderColor:'#004a8e',
        borderWidth:1,marginTop:20,
        marginRight:20,
        marginLeft:20,
        borderRadius:15
    },
    incrementText : {
        alignSelf:'center',
        padding:10,color:'black',
        marginLeft:0,
        fontWeight:'700'
    },

    decrementText : {
        alignSelf:'center',
        padding:10,
        color:'black',
        marginRight:0,
        fontWeight:'700'
    },

    counterText: {
        alignSelf:'center',
        padding:10,
        color:'#004a8e',
        fontWeight:'700'
    },

    description : {
        marginTop:10,
        marginLeft:20,
        fontWeight:'300',
        fontSize:16
    },

    productDescription : {
        marginTop:10,
        marginLeft:20,
        marginRight:20,
        marginBottom:10,
        fontWeight:'300',
        fontSize:14
    },

    morelikethistext : {
        marginTop:0,
        marginLeft:20,
        fontWeight:'500',
        fontSize:18
    },

    morelikeProductitem : {
        marginLeft:5,
        marginRight:5,
        marginTop:10,
        marginBottom:10,
        borderColor:'lightgray',
        borderWidth:2,
        borderRadius:10,
        backgroundColor:'white',
        padding:10
    },
    morelikeProductimage : {
        width:80,
        height:80,
        alignSelf:'center',
        marginTop:10
    },

    morelikeProductTitle : {
        marginLeft:10,
        marginTop:10
    },

    morelikeProductPrice : {
        marginLeft:10,
        marginTop:10,
        fontWeight:'700'
    },
    gotCartbtn : {
        backgroundColor:'#E1C16E',
        alignSelf:'flex-end',
        marginRight:20,
        marginTop:10,
        borderRadius:10
    },
    cartText : {
        padding:10,
        color:'black',
        fontWeight:'700'
    }

});

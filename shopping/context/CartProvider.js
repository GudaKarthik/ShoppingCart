import React, { useEffect } from "react";
import { createContext } from "react";  
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const CartContext = createContext();

const CartProvider = ({children}) => {

    const [isLoading,setIsLoading] = useState(false)
    const [userToken, setUserToken] = useState(null)

    const login = (username,password) => {
        axios.post('https://fakestoreapi.com/auth/login',{
            username,
            password
        })
        .then((response) => {
            setUserToken(response.token)
            setIsLoading(false)
            AsyncStorage.setItem('Auth',response.token) 
            console.log("The response is "+ response)
        })
        .catch((error) => {
            console.log("Error is " + error)
        })
       
    }

    function logout() {
        setUserToken(null)
        AsyncStorage.setItem('Auth')
        setIsLoading(false)
    }

    const isLoggedIn = async() => {
        try{
            setIsLoading(true)
            let token = await AsyncStorage.getItem('Auth')

            if(token){
                setUserToken(token)
            }

            setIsLoading(false)
        }catch(e){
            console.log("isLoggedIn error is " + e)
        }
    }

    useEffect(() => {
        isLoggedIn
    },[])

    // Cart List
    const [cart, setCart] = useState([]);
    const [increment, setCount] = useState(0);

    // Cart Item Count
    const [cartItemCount,setCartItemCount] = useState({})

    // Buy Now Product 
    const [buyNowProduct,setBuyNowProduct] = useState({});
    // Cart Price
    const [totalPrice, setTotalPrice] = useState('79879')

    // Adding Items to cart
    const addToCart = (cartItem) => {
    setCart((prevCart) => {
        const filteredCart = prevCart.filter((item) => item.id !== cartItem.id);
        return [...filteredCart,cartItem];
    });
    }

    // Getting Total Price
    const getTotalPrice = () => {
        cart.map((item) => {
            setTotalPrice((prev) => {
                prev + item.price
            })
        })
    }

    // Removing a Product from the cart
    const deleteProduct = (product) => {
        setCart((prevCart) => {
            const removedItems = prevCart.filter((item) => item.id !== product.id);
            return removedItems
        })
    }

    // Adding product when clicked Buy Now
    const addItem = (item) => {
        setBuyNowProduct(item);
    }

    // Increment CartItemCount
    const incrementCartCount = (itemId) => {
        setCartItemCount((prevItems) => {
            const newCount = (prevItems[itemId] || 0) + 1;
            return { ...prevItems, [itemId]: newCount };
        });
    }

    // Decrement Cart Count
    const decrementCartCount = (itemId) => {
        setCartItemCount((prevItems) => {
            const newCount = Math.max(0, (prevItems[itemId] || 0) - 1);
            return { ...prevItems, [itemId]: newCount };
        });
    }

    return(
        <CartContext.Provider value={{cart,addItem,increment,addToCart,deleteProduct,
        buyNowProduct,getTotalPrice,totalPrice,cartItemCount,incrementCartCount,
        decrementCartCount,isLoading,userToken,login,logout}}>
            {children}
        </CartContext.Provider>
    )

}

export default CartProvider;
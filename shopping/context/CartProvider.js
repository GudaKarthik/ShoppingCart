import React, { useEffect } from "react";
import { createContext } from "react";  
import { useState } from "react";

export const CartContext = createContext();

const CartProvider = ({children}) => {

    const [cart, setCart] = useState([]);
    const [increment, setCount] = useState(0);
    const [buyNowProduct,setBuyNowProduct] = useState({});

    const addToCart = (cartItem) => {
   //     setCart([...cart,cartItem]);
    setCart((prevCart) => {
        const filteredCart = prevCart.filter((item) => item.id !== cartItem.id);
        return [...filteredCart,cartItem];
    });
    }

    const deleteProduct = () => {
        setCount(increment - 1);
    }

    const addItem = (item) => {
        setBuyNowProduct(item);
        
    }

    const removeItem = (itemId) => {
       
    }

    const setIncrement = (itemId, count) => {
        if(itemId){
        setCount(increment + 1);
        }
    }

    return(
        <CartContext.Provider value={{cart,addItem,removeItem,increment,addToCart,deleteProduct,buyNowProduct}}>
            {children}
        </CartContext.Provider>
    )

}

export default CartProvider;
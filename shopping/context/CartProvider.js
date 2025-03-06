import React, { useEffect } from "react";
import { createContext } from "react";  
import { useState } from "react";

export const CartContext = createContext();

const CartProvider = ({children}) => {

    // Cart List
    const [cart, setCart] = useState([]);
    const [increment, setCount] = useState(0);
    // Buy Now Product 
    const [buyNowProduct,setBuyNowProduct] = useState({});

    const addToCart = (cartItem) => {
    setCart((prevCart) => {
        const filteredCart = prevCart.filter((item) => item.id !== cartItem.id);
        return [...filteredCart,cartItem];
    });
    }

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

    return(
        <CartContext.Provider value={{cart,addItem,increment,addToCart,deleteProduct,buyNowProduct}}>
            {children}
        </CartContext.Provider>
    )

}

export default CartProvider;
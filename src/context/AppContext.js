import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToCart = (product) => {
    if (!cartItems.find((item) => item.id === product.id)) {
      setCartItems([...cartItems, product]);
    }
  };

  const addToWishlist = (product) => {
    if (!wishlistItems.find((item) => item.id === product.id)) {
      setWishlistItems([...wishlistItems, product]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        cartItems,
        wishlistItems,
        addToCart,
        addToWishlist,
        removeFromCart,
        removeFromWishlist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

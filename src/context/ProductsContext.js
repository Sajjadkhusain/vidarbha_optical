// context/ProductsContext.js
import React, { createContext, useContext } from "react";
import { products } from "../data/products";

const ProductsContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};

export const ProductsProvider = ({ children }) => {
  const getProductById = (id) => {
    return products.find((product) => product.id === parseInt(id));
  };

  const getProductsByCategory = (category) => {
    return products.filter((product) => product.category === category);
  };

  const value = {
    products,
    getProductById,
    getProductsByCategory,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

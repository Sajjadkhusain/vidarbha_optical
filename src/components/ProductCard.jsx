import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import { FaRegHeart, FaShoppingCart, FaTrash } from "react-icons/fa";
import "../style/productcard.css";

const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist, removeFromWishlist, wishlistItems } =
    useContext(AppContext);

  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  return (
    <motion.div
      className="product-card"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <img src={product.image} alt={product.name} className="product-img" />

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">₹{product.price}</p>
        <p className="product-desc">{product.description}</p>
      </div>

      <div className="product-actions">
        <button
          className="btn-icon success"
          onClick={() => addToCart(product)}
          title="Add to Cart"
        >
          <FaShoppingCart />
        </button>

        {isWishlisted ? (
          <button
            className="btn-icon danger"
            onClick={() => removeFromWishlist(product.id)}
            title="Remove from Wishlist"
          >
            <FaTrash />
          </button>
        ) : (
          <button
            className="btn-icon"
            onClick={() => addToWishlist(product)}
            title="Add to Wishlist"
          >
            <FaRegHeart />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;

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
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="product-img-container">
        <img src={product.image} alt={product.name} className="product-img" />
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>

        <div className="product-price-group">
          {product.originalPrice && (
            <span className="original-price">₹{product.originalPrice}</span>
          )}
          <span className="discounted-price">₹{product.price}</span>
        </div>

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

import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import { FaRegHeart, FaShoppingCart, FaTrash, FaHeart } from "react-icons/fa";
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
        <button
          className="wishlist-icon-top"
          onClick={() =>
            isWishlisted
              ? removeFromWishlist(product.id)
              : addToWishlist(product)
          }
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          {isWishlisted ? <FaHeart className="wishlisted" /> : <FaRegHeart />}
        </button>
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>

        <div className="product-price-group">
          {product.originalPrice && (
            <span className="original-price">₹{product.originalPrice}</span>
          )}{" "}
          &nbsp;
          <span className="discounted-price">₹{product.price}</span>
        </div>

        <p className="product-desc">{product.description}</p>
      </div>
      <div className="product-actions">
        <button
          className="btn success"
          onClick={() => addToCart(product)}
          title="Add to Cart"
        >
          <FaShoppingCart className="icon" /> Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;

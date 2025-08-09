import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import {
  FaRegHeart,
  FaShoppingCart,
  FaTrash,
  FaStarHalfAlt,
  FaStar,
  FaHeart,
  FaRegStar,
} from "react-icons/fa";
import "../style/productcard.css";

const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist, removeFromWishlist, wishlistItems } =
    useContext(AppContext);

  const isWishlisted = wishlistItems.some((item) => item.id === product.id);
  const renderStarRating = (rating) => {
    if (typeof rating !== "number") return null;

    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="star filled" />);
    }

    // Half star
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="star half-filled" />);
    }

    // Empty stars
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="star" />);
    }

    return <div className="stars">{stars}</div>;
  };

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
      <div className="rating-container">
        {renderStarRating(product.rating?.average || 0)}
      </div>
      <div className="product-actions">
        <button
          className={`btn success ${!product.inStock ? "disabled" : ""}`}
          onClick={() => product.inStock && addToCart(product)}
          title={product.inStock ? "Add to Cart" : "Out of Stock"}
          disabled={!product.inStock}
        >
          <FaShoppingCart className="icon" />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;

// pages/ProductDetailPage.js
import React, { useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { products as productData } from "../data/products";
import {
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaArrowLeft,
} from "react-icons/fa";
import { motion } from "framer-motion";
import "../style/ProductDetailPage.css";

const ProductDetailPage = () => {
  const { id } = useParams();
  const {
    addToCart,
    addToWishlist,
    removeFromWishlist,
    wishlistItems,
    cartItems,
  } = useContext(AppContext);

  const product = productData.find((p) => p.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="product-not-found">
          <h2>Product not found</h2>
          <Link to="/" className="back-to-home">
            <FaArrowLeft /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const isWishlisted = wishlistItems.some((item) => item.id === product.id);
  const inCart = cartItems.some((item) => item.id === product.id);

  // Create an array of images (main image + additional images if available)
  const images = [product.image, ...(product.additionalImages || [])];

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

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="product-detail-container">
      <Link to="/" className="back-button">
        <FaArrowLeft /> Continue Shopping
      </Link>

      <div className="product-detail">
        <div className="product-image-section">
          <div className="main-image">
            <motion.img
              key={selectedImage}
              src={images[selectedImage]}
              alt={product.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>
          {images.length > 1 && (
            <div className="image-thumbnails">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`thumbnail ${
                    selectedImage === index ? "active" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt={`${product.name} view ${index + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="product-info-section">
          <h1 className="product-title">{product.name}</h1>

          <div className="price-container">
            {product.originalPrice && (
              <span className="original-price">₹{product.originalPrice}</span>
            )}
            <span className="current-price">₹{product.price}</span>
            {product.originalPrice && (
              <span className="discount-percent">
                {Math.round((1 - product.price / product.originalPrice) * 100)}%
                off
              </span>
            )}
          </div>

          <div className="rating-container">
            {renderStarRating(product.rating?.average || 0)}
            <span className="rating-text">
              {product.rating?.average || 0} ({product.rating?.count || 0}{" "}
              reviews)
            </span>
          </div>

          <p className="product-description">{product.description}</p>

          <div className="product-meta">
            <div className="meta-item">
              <strong>Category:</strong> {product.gender}
            </div>
            <div className="meta-item">
              <strong>Availability:</strong>
              <span className={product.inStock ? "in-stock" : "out-of-stock"}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          </div>

          <div className="quantity-selector">
            <label htmlFor="quantity">Quantity:</label>
            <div className="quantity-controls">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                disabled={!product.inStock}
              >
                +
              </button>
            </div>
          </div>

          <div className="action-buttons">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className={`add-to-cart-btn ${
                !product.inStock ? "disabled" : ""
              }`}
              onClick={handleAddToCart}
              disabled={!product.inStock || inCart}
            >
              <FaShoppingCart />
              {inCart
                ? "Added to Cart"
                : product.inStock
                ? "Add to Cart"
                : "Out of Stock"}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className={`wishlist-btn ${isWishlisted ? "wishlisted" : ""}`}
              onClick={() =>
                isWishlisted
                  ? removeFromWishlist(product.id)
                  : addToWishlist(product)
              }
            >
              {isWishlisted ? <FaHeart /> : <FaRegHeart />}
              {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

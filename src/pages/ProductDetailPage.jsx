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
  FaChevronLeft,
  FaChevronRight,
  FaUser,
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
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const customerReviews = [
    {
      id: 1,
      customerName: "Sajjad Husain khan",
      rating: 4.5,
      date: "2023-10-15",
      comment:
        "Great quality sunglasses! The UV protection is excellent and they look stylish.",
    },
    {
      id: 2,
      customerName: "Taha Sauban",
      rating: 5,
      date: "2023-10-10",
      comment:
        "Absolutely love these! Perfect fit and very comfortable to wear all day.",
    },
    {
      id: 3,
      customerName: "Mohammad Usama",
      rating: 3.5,
      date: "2023-10-05",
      comment:
        "Good sunglasses but could be more durable. The frame feels a bit fragile.",
    },
  ];

  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="product-not-found">
          <div className="not-found-content">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="not-found-icon"
            >
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="#dc3545"
                  strokeWidth="2"
                />
                <path
                  d="M15 9L9 15"
                  stroke="#dc3545"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 9L15 15"
                  stroke="#dc3545"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
            <h2>Product Not Found</h2>
            <p>
              We're sorry, but the product you're looking for doesn't exist or
              may have been removed.
            </p>
            <Link to="/" className="back-to-home-btn">
              <FaArrowLeft /> Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isWishlisted = wishlistItems.some((item) => item.id === product.id);
  const inCart = cartItems.some((item) => item.id === product.id);

  // Create an array of images (main image + additional images if available)
  const images = product.additionalImages
    ? [product.image, ...product.additionalImages]
    : [product.image];

  const handleImageMove = (e) => {
    if (!isZoomed) return;

    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

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
          <div className="main-image-container">
            <div
              className={`main-image ${isZoomed ? "zoomed" : ""}`}
              onMouseMove={handleImageMove}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
            >
              <motion.img
                key={selectedImage}
                src={images[selectedImage]}
                alt={product.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  transform: isZoomed ? "scale(2)" : "scale(1)",
                }}
              />
            </div>
            {/* {images.length > 1 && (
              <>
                <button className="nav-button prev" onClick={prevImage}>
                  <FaChevronLeft />
                </button>
                <button className="nav-button next" onClick={nextImage}>
                  <FaChevronRight />
                </button>
              </>
            )} */}
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
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="original-price">
                {" "}
                RS, {product.originalPrice}
              </span>
            )}
            <span className="current-price"> RS, {product.price}</span>
          </div>

          <div className="rating-container">
            {renderStarRating(product.rating?.average || 0)}
            <span className="rating-text">
              {product.rating?.average || 0} ({product.rating?.count || 0}{" "}
              reviews)
            </span>
          </div>

          <p className="product-description">{product.description}</p>

          <div className="action-buttons">
            <button
              className={`add-to-cart-btn ${
                !product.inStock ? "disabled" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                product.inStock && addToCart(product);
              }}
              title={product.inStock ? "Add to Cart" : "Out of Stock"}
              disabled={!product.inStock}
            >
              <FaShoppingCart className="icon" />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className={`wishlist-btn ${isWishlisted ? "wishlisted" : ""}`}
              onClick={() =>
                isWishlisted
                  ? removeFromWishlist(product.id)
                  : addToWishlist(product)
              }
              aria-label={
                isWishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
            >
              {isWishlisted ? <FaHeart /> : <FaRegHeart />}
              {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="customer-reviews-section">
        <h2 className="reviews-title">Customer Reviews</h2>
        <div className="reviews-list">
          {customerReviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">
                    <FaUser />
                  </div>
                  <div className="reviewer-details">
                    <h4 className="reviewer-name">{review.customerName}</h4>
                    {review.verified && (
                      <span className="verified-buyer">Verified Buyer</span>
                    )}
                  </div>
                </div>
                <div className="review-date">
                  {new Date(review.date).toLocaleDateString()}
                </div>
              </div>

              <div className="review-rating">
                {renderStarRating(review.rating)}
              </div>

              <p className="review-comment">{review.comment}</p>
            </div>
          ))}
        </div>

        {/* <button className="view-all-reviews-btn">View All Reviews</button> */}
      </div>
    </div>
  );
};

export default ProductDetailPage;

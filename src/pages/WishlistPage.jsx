import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FaHeart } from "react-icons/fa";
import "../style/WishlistPage.css";

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useContext(AppContext);
  const hasItems = wishlistItems.length > 0;

  return (
    <div className="container">
      {hasItems && (
        <h2 className="wishlist-title">
          <FaHeart className="wishlist-icon" />
          Your Wishlist
        </h2>
      )}

      {!hasItems ? (
        <div className="empty-card">
          <h2 className="wish-title">🖤 Your Wishlist</h2>
          <h3>No items in your wishlist</h3>
          <p>Start exploring and add your favorites!</p>
        </div>
      ) : (
        <div className="grid">
          {wishlistItems.map((item) => (
            <div key={item.id} className="product-card">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
              <button onClick={() => removeFromWishlist(item.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;

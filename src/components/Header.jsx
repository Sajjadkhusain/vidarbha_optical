import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import "../style/header.css";

const Header = () => {
  const { cartItems, wishlistItems } = useContext(AppContext);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <Link to="/" className="logo">
            <span className="logo-icon">🕶️</span>
            <span className="logo-text">VIDARBHA OPTICAL</span>
          </Link>
        </div>

        <nav className="nav-links">
          <Link to="/wishlist" className="icon-link" title="Wishlist">
            <div className="icon-circle">
              <FaHeart className="nav-icon" />
              {wishlistItems.length > 0 && (
                <span className="badge">{wishlistItems.length}</span>
              )}
            </div>
          </Link>

          <Link to="/cart" className="icon-link" title="Cart">
            <div className="icon-circle">
              <FaShoppingCart className="nav-icon" />
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </div>
          </Link>

          <div
            className="icon-link user-icon"
            onClick={() => setShowDropdown(!showDropdown)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <div className="icon-circle">
              <FaUser className="nav-icon" />
            </div>
            {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/signin">Sign In</Link>
                <Link to="/create-account">Create Account</Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

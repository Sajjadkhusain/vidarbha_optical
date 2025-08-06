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
      <div className="logo-container">
        <Link to="/" className="logo">
          🕶️ VIDARBHA OPTICAL
        </Link>
      </div>

      <nav className="nav-links">
        <Link to="/wishlist" className="icon-link" title="Wishlist">
          <div className="icon-circle">
            <FaHeart />
            <span className="badge">{wishlistItems.length}</span>
          </div>
        </Link>

        <Link to="/cart" className="icon-link" title="Cart">
          <div className="icon-circle">
            <FaShoppingCart />
            <span className="badge">{cartItems.length}</span>
          </div>
        </Link>

        <div
          className="icon-link user-icon"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          {/* <div className="icon-circle">
            <FaUser />
          </div> */}
          {showDropdown && (
            <div className="dropdown-menu">
              <Link to="/signin">Sign In</Link>
              <Link to="/create-account">Create Account</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;

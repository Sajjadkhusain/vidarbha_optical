import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // ✅ Import navigate
import "../style/CartPage.css";

const CartPage = () => {
  const { cartItems, removeFromCart } = useContext(AppContext);
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);
  const navigate = useNavigate(); // ✅ Hook

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-msg">Your cart is empty.</p>
      ) : (
        <div className="cart-list">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-img" />
              <div className="cart-details">
                <h4>{item.name}</h4>
                <p>₹{item.price.toFixed(2)}</p>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
                title="Remove"
              >
                <FaTrash />
              </button>
            </div>
          ))}

          <div className="cart-summary">
            <h3>Total: ₹{total.toFixed(2)}</h3>

            {/* ✅ Redirect to /checkout */}
            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

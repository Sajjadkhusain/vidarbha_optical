import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../style/CartPage.css";

const CartPage = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity } =
    useContext(AppContext);
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const navigate = useNavigate();

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    updateCartItemQuantity(itemId, newQuantity);
  };

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
              <div className="cart-content-wrapper">
                <div className="cart-details">
                  <h4>{item.name}</h4>
                  <p className="item-price">₹{item.price.toFixed(2)}</p>

                  {/* Quantity Controls */}
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      aria-label="Decrease quantity"
                    >
                      <FaMinus />
                    </button>
                    <span className="quantity-number">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      aria-label="Increase quantity"
                    >
                      <FaPlus />
                    </button>
                  </div>

                  <p className="item-total">
                    Total: ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                  title="Remove"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <h3>Grand Total: ₹{total.toFixed(2)}</h3>
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

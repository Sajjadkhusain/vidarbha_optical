import React from "react";
import "./Invoice.css";

const Invoice = ({ customerName, cartItems, total }) => {
  return (
    <div className="invoice" id="invoice">
      <h2>Order Invoice</h2>
      <p>
        <strong>Customer:</strong> {customerName}
      </p>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>₹ {item.price.toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <td>
              <strong>Total</strong>
            </td>
            <td>
              <strong>₹ {total.toFixed(2)}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Invoice;

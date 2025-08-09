import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import "../style/Stepper.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems } = useContext(AppContext);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    mobileNo: "",
    email: "",
    address: "",
    payment: "cod",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderSummary = `
    Name: ${form.name}
    Mobile:${form.mobileNo}
    Email: ${form.email}
    Address: ${form.address}
    Payment: ${form.payment}
    Items: ${cartItems.map((i) => i.name).join(", ")}
        `;

    // Show success toast
    toast.success("Order placed successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    // Clear cart if you have that functionality
    // clearCart();

    // Reset form
    setForm({
      name: "",
      email: "",
      address: "",
      payment: "cod",
    });

    // Reset to step 1
    setStep(1);
  };

  // ... rest of your component remains the same

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  return (
    <div className="checkout-container">
      <div className="card">
        <div className="card-header">
          <h2>Checkout</h2>
          <p>Step {step} of 3</p>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit} className="step-form">
            {step === 1 && (
              <>
                <input
                  className="form-input"
                  required
                  placeholder="Enter Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  className="form-input"
                  required
                  placeholder="Enter Mobile Number"
                  value={form.mobileNo}
                  onChange={(e) =>
                    setForm({ ...form, mobileNo: e.target.value })
                  }
                />
                <input
                  className="form-input"
                  required
                  type="email"
                  placeholder="Enter Email Address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <div className="form-actions">
                  <button
                    type="button"
                    className="btn nextBtn"
                    onClick={nextStep}
                  >
                    <span style={{ color: "white" }}>Next</span>
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <textarea
                  className="form-textarea"
                  required
                  placeholder="Delivery Address"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                />
                <select
                  className="form-select"
                  value={form.payment}
                  onChange={(e) =>
                    setForm({ ...form, payment: e.target.value })
                  }
                >
                  <option value="cod">Cash on Delivery</option>
                  <option value="prepaid">Prepaid</option>
                </select>
                <div className="form-actions">
                  <button
                    type="button"
                    className="btn backBtn"
                    onClick={prevStep}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="btn nextBtn"
                    onClick={nextStep}
                  >
                    <span style={{ color: "white" }}>Next</span>
                  </button>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <h4 className="review-title">Review Order</h4>
                <div className="responsive-table-container">
                  <table className="order-review-table">
                    <tbody>
                      <tr>
                        <th>Name:</th>
                        <td>{form.name}</td>
                      </tr>
                      <tr>
                        <th>Mobile No:</th>
                        <td>{form.mobileNo}</td>
                      </tr>
                      <tr>
                        <th>Email:</th>
                        <td>{form.email}</td>
                      </tr>
                      <tr>
                        <th>Address:</th>
                        <td>{form.address}</td>
                      </tr>
                      <tr>
                        <th>Payment:</th>
                        <td>
                          {form.payment === "cod"
                            ? "Cash on Delivery"
                            : "Prepaid"}
                        </td>
                      </tr>
                      <tr>
                        <th>Items:</th>
                        <td>
                          <ul className="items-list">
                            {cartItems.map((item, index) => (
                              <li key={index}>
                                {item.name}{" "}
                                {item.quantity && `(Qty: ${item.quantity})`}
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn backBtn"
                    onClick={prevStep}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="btn plsOrder"
                    onClick={() => navigate("/")}
                  >
                    Place Order
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

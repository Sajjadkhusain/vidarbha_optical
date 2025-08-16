import React, { useContext, useState, useRef } from "react";
import { AppContext } from "../context/AppContext";
import "../style/Stepper.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";
emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY);
const CheckoutPage = () => {
  const formRef = useRef();
  const navigate = useNavigate();
  const { cartItems, clearCart } = useContext(AppContext);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    mobileNo: "",
    email: "",
    address: "",
    payment: "cod",
    eyeCard: null,
  });

  const [errors, setErrors] = useState({
    name: "",
    mobileNo: "",
    email: "",
    address: "",
    eyeCard: "",
  });

  // EmailJS configuration
  const serviceId =
    "service_ee9wro9" || process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const templateId =
    "template_5uk5mdr" || process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const userId =
    "Er0GuZD1HTMmw5Qfp" || process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  // Validation functions
  const validateStep1 = () => {
    const newErrors = { name: "", mobileNo: "", email: "" };
    let isValid = true;

    if (!form.name.trim()) {
      newErrors.name = "Full name is required";
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(form.name)) {
      newErrors.name = "Name should contain only letters";
      isValid = false;
    }

    if (!form.mobileNo.trim()) {
      newErrors.mobileNo = "Mobile number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(form.mobileNo)) {
      newErrors.mobileNo = "Please enter a valid 10-digit mobile number";
      isValid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = "Email address is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateStep2 = () => {
    const newErrors = { ...errors, address: "", eyeCard: "" };
    let isValid = true;

    if (!form.address.trim()) {
      newErrors.address = "Delivery address is required";
      isValid = false;
    } else if (form.address.trim().length < 10) {
      newErrors.address = "Address should be at least 10 characters";
      isValid = false;
    }

    if (!form.eyeCard) {
      newErrors.eyeCard = "Eye card is required";
      isValid = false;
    } else if (form.eyeCard.size > 5 * 1024 * 1024) {
      newErrors.eyeCard = "File size should be less than 5MB";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  // Form field handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, eyeCard: file }));
      setErrors((prev) => ({ ...prev, eyeCard: "" }));
    }
  };

  const sendOrderConfirmation = async () => {
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    const orderDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Format order items as a string with line breaks
    const orderItemsHTML = cartItems
      .map(
        (item) => `
      <tr>
        <td data-label="Item">${item.name}</td>
        <td data-label="Quantity">${item.quantity || 1}</td>
        <td data-label="Unit Price">₹${item.price.toFixed(2)}</td>
        <td data-label="Amount">₹${(item.price * (item.quantity || 1)).toFixed(
          2
        )}</td>
      </tr>
    `
      )
      .join("");

    const templateParams = {
      to_name: form.name,
      to_email: form.email,
      order_id: orderId,
      order_date: orderDate,
      customer_name: form.name,
      customer_email: form.email,
      customer_phone: form.mobileNo,
      delivery_address: form.address,
      payment_method:
        form.payment === "cod"
          ? "Cash on Delivery"
          : form.payment === "phonepe"
          ? "PhonePe"
          : "Online Payment",
      order_items: orderItemsHTML,
      total_amount: `₹${cartItems
        .reduce((total, item) => total + item.price * (item.quantity || 1), 0)
        .toFixed(2)}`,
      eye_card: form.eyeCard ? form.eyeCard.name : "Not provided",
    };

    try {
      console.log("Sending email with params:", templateParams);
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        userId
      );
      console.log("Email sent successfully:", response);
      return { success: true, orderId };
    } catch (error) {
      console.error("Email sending error:", error);
      if (error.response) {
        console.error("EmailJS response error:", error.response.data);
      }
      return { success: false, orderId };
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateStep1() || !validateStep2()) {
      setStep(1);
      toast.error("Please fix all errors before submitting");
      setIsSubmitting(false);
      return;
    }

    if (form.payment === "phonepe") {
      const isConfirmed = window.confirm(
        "Have you completed the PhonePe payment? Please ensure payment is done before confirming."
      );
      if (!isConfirmed) {
        setIsSubmitting(false);
        return;
      }
    }

    try {
      const { success, orderId } = await sendOrderConfirmation();

      if (success) {
        toast.success("Order placed successfully!");
      } else {
        toast.error("Order placed but confirmation email failed to send");
      }
      if (success) {
        setForm({
          name: "",
          mobileNo: "",
          email: "",
          address: "",
          payment: "cod",
          eyeCard: null,
        });
        clearCart();
        navigate("/");
      }
    } catch (error) {
      console.error("Order submission error:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  // Calculate total amount
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="checkout-container">
      <div className="card">
        <div className="card-header">
          <h2>Checkout</h2>
          <div className="stepper">
            {[1, 2, 3].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`step ${step >= stepNumber ? "active" : ""}`}
              >
                <span>{stepNumber}</span>
                <p className="step-label">
                  {stepNumber === 1 && "Personal Info"}
                  {stepNumber === 2 && "Delivery Info"}
                  {stepNumber === 3 && "Review Order"}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="card-body">
          <form ref={formRef} onSubmit={handleSubmit} className="step-form">
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div className="step-content">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    className={`form-input ${errors.name ? "error" : ""}`}
                    placeholder="Enter Your Full Name"
                    value={form.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <span className="error-message">{errors.name}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="mobileNo">Mobile Number</label>
                  <input
                    id="mobileNo"
                    name="mobileNo"
                    className={`form-input ${errors.mobileNo ? "error" : ""}`}
                    placeholder="Enter 10-Digit Mobile Number"
                    value={form.mobileNo}
                    onChange={handleChange}
                    type="tel"
                    maxLength="10"
                  />
                  {errors.mobileNo && (
                    <span className="error-message">{errors.mobileNo}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    className={`form-input ${errors.email ? "error" : ""}`}
                    type="email"
                    placeholder="Enter Your Email Address"
                    value={form.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <span className="error-message">{errors.email}</span>
                  )}
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn nextBtn"
                    onClick={handleNext}
                    disabled={isSubmitting}
                  >
                    Continue to Delivery
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Delivery Info */}
            {step === 2 && (
              <div className="step-content">
                <div className="form-group">
                  <label htmlFor="address">Delivery Address</label>
                  <textarea
                    id="address"
                    name="address"
                    className={`form-textarea ${errors.address ? "error" : ""}`}
                    placeholder="Enter Complete Delivery Address With Landmark"
                    value={form.address}
                    onChange={handleChange}
                    rows="4"
                  />
                  {errors.address && (
                    <span className="error-message">{errors.address}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="eyeCard">Upload Eye Card (Image/PDF)</label>
                  <div className="file-upload-container">
                    <label htmlFor="eyeCard" className="file-upload-label">
                      <div className="file-upload-box">
                        {form.eyeCard ? (
                          <>
                            <div className="file-preview">
                              {form.eyeCard.type.includes("image") ? (
                                <img
                                  src={URL.createObjectURL(form.eyeCard)}
                                  alt="Eye card preview"
                                  className="preview-image"
                                />
                              ) : (
                                <div className="file-icon">
                                  <i className="fas fa-file-pdf"></i>
                                  <span>{form.eyeCard.name}</span>
                                </div>
                              )}
                            </div>
                            <button
                              type="button"
                              className="change-file-btn"
                              onClick={() =>
                                setForm((prev) => ({ ...prev, eyeCard: null }))
                              }
                            >
                              Change File
                            </button>
                          </>
                        ) : (
                          <>
                            <div className="upload-icon">
                              <i className="fas fa-cloud-upload-alt"></i>
                            </div>
                            <p className="upload-text">
                              Click to browse or drag and drop
                            </p>
                            <p className="upload-hint">
                              Supports JPG, PNG, PDF (Max 5MB)
                            </p>
                          </>
                        )}
                      </div>
                      <input
                        id="eyeCard"
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileChange}
                        className="file-input"
                      />
                    </label>
                    {errors.eyeCard && (
                      <span className="error-message">{errors.eyeCard}</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="payment">Payment Method</label>
                  <select
                    id="payment"
                    name="payment"
                    className="form-select"
                    value={form.payment}
                    onChange={handleChange}
                  >
                    <option value="cod">Cash on Delivery</option>
                    {/* <option value="phonepe">PhonePe</option>
                    <option value="prepaid">Other Online Payment</option> */}
                  </select>
                </div>

                {form.payment === "phonepe" && (
                  <div className="phonepe-container">
                    <div className="phonepe-info">
                      <p>Pay securely using PhonePe</p>
                      <div className="phonepe-image-container">
                        <img
                          src="/assets/img/phon-logo.png"
                          alt="PhonePe Payment"
                          className="phonepe-image"
                        />
                      </div>
                      <p className="phonepe-instructions">
                        Scan the QR code or use UPI ID: yourstore@phonepe
                      </p>
                      <p className="phonepe-note">
                        Please complete the payment and confirm below
                      </p>
                    </div>
                  </div>
                )}

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn backBtn"
                    onClick={prevStep}
                    disabled={isSubmitting}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="btn nextBtn"
                    onClick={handleNext}
                    disabled={isSubmitting}
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review Order */}
            {step === 3 && (
              <div className="step-content">
                <h4 className="review-title">Order Summary</h4>
                <div className="responsive-table-container">
                  <table className="order-review-table">
                    <tbody>
                      <tr>
                        <th>Full Name:</th>
                        <td>{form.name}</td>
                      </tr>
                      <tr>
                        <th>Mobile Number:</th>
                        <td>{form.mobileNo}</td>
                      </tr>
                      <tr>
                        <th>Email Address:</th>
                        <td>{form.email}</td>
                      </tr>
                      <tr>
                        <th>Delivery Address:</th>
                        <td>{form.address}</td>
                      </tr>
                      <tr>
                        <th>Eye Card:</th>
                        <td>
                          {form.eyeCard ? (
                            <div className="file-info">
                              <span className="file-name">
                                {form.eyeCard.name}
                              </span>
                              {form.eyeCard.type.includes("image") ? (
                                <a
                                  href={URL.createObjectURL(form.eyeCard)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="file-link"
                                >
                                  (View Image)
                                </a>
                              ) : (
                                <a
                                  href={URL.createObjectURL(form.eyeCard)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="file-link"
                                >
                                  (View PDF)
                                </a>
                              )}
                            </div>
                          ) : (
                            "No file uploaded"
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th>Payment Method:</th>
                        <td>
                          {form.payment === "cod"
                            ? "Cash on Delivery"
                            : form.payment === "phonepe"
                            ? "PhonePe"
                            : "Online Payment"}
                        </td>
                      </tr>
                      <tr>
                        <th>Order Items:</th>
                        <td>
                          <ul className="items-list">
                            {cartItems.map((item, index) => (
                              <li key={index}>
                                {item.name} (Qty: {item.quantity || 1}) - ₹
                                {item.price
                                  ? (item.price * (item.quantity || 1)).toFixed(
                                      2
                                    )
                                  : "N/A"}
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                      <tr className="total-row">
                        <th>Total Amount:</th>
                        <td>₹{totalAmount.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn backBtn"
                    onClick={prevStep}
                    disabled={isSubmitting}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="btn plsOrder"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Processing...
                      </>
                    ) : (
                      "Confirm Order"
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

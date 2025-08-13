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
    eyeCard: null, // Add this for file upload
  });

  const [errors, setErrors] = useState({
    name: "",
    mobileNo: "",
    email: "",
    address: "",
    eyeCard: "", // Add this for file validation
  });

  const validateStep1 = () => {
    const newErrors = {
      name: "",
      mobileNo: "",
      email: "",
    };
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
    const newErrors = {
      ...errors,
      address: "",
      eyeCard: "",
    };
    let isValid = true;

    if (!form.address.trim()) {
      newErrors.address = "Delivery address is required";
      isValid = false;
    } else if (form.address.trim().length < 10) {
      newErrors.address = "Address should be at least 10 characters";
      isValid = false;
    }

    // Add validation for eye card if needed
    if (!form.eyeCard) {
      newErrors.eyeCard = "Eye card is required";
      isValid = false;
    } else if (form.eyeCard.size > 5 * 1024 * 1024) {
      // 5MB limit
      newErrors.eyeCard = "File size should be less than 5MB";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep((s) => s + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateStep1() || !validateStep2()) {
      toast.error("Please fix all errors before submitting", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    if (form.payment === "phonepe") {
      const isConfirmed = window.confirm(
        "Have you completed the PhonePe payment? Please ensure payment is done before confirming."
      );
      if (!isConfirmed) return;
    }

    const orderSummary = `
  Name: ${form.name}
  Mobile: ${form.mobileNo}
  Email: ${form.email}
  Address: ${form.address}
  Eye Card: ${form.eyeCard ? form.eyeCard.name : "Not provided"}
  Payment: ${
    form.payment === "cod"
      ? "Cash on Delivery"
      : form.payment === "phonepe"
      ? "PhonePe"
      : "Online Payment"
  }
  Items: ${cartItems.map((i) => i.name).join(", ")}
`;

    toast.success("Order placed successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setForm({
      name: "",
      mobileNo: "",
      email: "",
      address: "",
      payment: "cod",
    });

    setStep(1);
    navigate("/");
  };

  const prevStep = () => setStep((s) => s - 1);

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setForm({ ...form, name: value });
      setErrors({ ...errors, name: "" });
    }
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 10) {
      setForm({ ...form, mobileNo: value });
      setErrors({ ...errors, mobileNo: "" });
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, eyeCard: file });
      setErrors({ ...errors, eyeCard: "" });
    }
  };
  return (
    <div className="checkout-container">
      <div className="card">
        <div className="card-header">
          <h2>Checkout</h2>
          <div className="stepper">
            <div className={`step ${step >= 1 ? "active" : ""}`}>
              <span>1</span>
              <p className="step-label">Personal Info</p>
            </div>
            <div className={`step ${step >= 2 ? "active" : ""}`}>
              <span>2</span>
              <p className="step-label">Delivery Info</p>
            </div>
            <div className={`step ${step >= 3 ? "active" : ""}`}>
              <span>3</span>
              <p className="step-label">Review Order</p>
            </div>
          </div>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit} className="step-form">
            {step === 1 && (
              <>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    className={`form-input ${errors.name ? "error" : ""}`}
                    required
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={handleNameChange}
                  />
                  {errors.name && (
                    <span className="error-message">{errors.name}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="mobile">Mobile Number</label>
                  <input
                    id="mobile"
                    className={`form-input ${errors.mobileNo ? "error" : ""}`}
                    required
                    placeholder="Enter 10-digit mobile number"
                    value={form.mobileNo}
                    onChange={handleMobileChange}
                    type="tel"
                  />
                  {errors.mobileNo && (
                    <span className="error-message">{errors.mobileNo}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    className={`form-input ${errors.email ? "error" : ""}`}
                    required
                    type="email"
                    placeholder="Enter your email address"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
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
                  >
                    Continue to Delivery
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="form-group">
                  <label htmlFor="address">Delivery Address</label>
                  <textarea
                    id="address"
                    className={`form-textarea ${errors.address ? "error" : ""}`}
                    required
                    placeholder="Enter complete delivery address"
                    value={form.address}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
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
                                setForm({ ...form, eyeCard: null })
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
                    className="form-select"
                    value={form.payment}
                    onChange={(e) =>
                      setForm({ ...form, payment: e.target.value })
                    }
                  >
                    <option value="cod">Cash on Delivery</option>
                    <option value="phonepe">PhonePe</option>
                    <option value="prepaid">Other Online Payment</option>
                  </select>
                </div>

                {form.payment === "phonepe" && (
                  <div className="phonepe-container">
                    <div className="phonepe-info">
                      <p>Pay securely using PhonePe</p>
                      <div className="phonepe-image-container">
                        <img
                          src="assets/img/QR.jpg"
                          alt="PhonePe Payment"
                          className="phonepe-image"
                        />
                      </div>
                      <p className="phonepe-instructions">
                        Scan the QR code or use UPI ID: yourstore@phonepe
                      </p>
                    </div>
                  </div>
                )}

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
                    onClick={handleNext}
                  >
                    Review Order
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
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
                            <>
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
                            </>
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
                  <button type="submit" className="btn plsOrder">
                    Confirm Order
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

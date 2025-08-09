// import React, { useContext, useState } from "react";
// import { AppContext } from "../context/AppContext";
// import "../style/Stepper.css";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const CheckoutPage = () => {
//   const navigate = useNavigate();
//   const { cartItems } = useContext(AppContext);
//   const [step, setStep] = useState(1);
//   const [form, setForm] = useState({
//     name: "",
//     mobileNo: "",
//     email: "",
//     address: "",
//     payment: "cod",
//   });
//   const [errors, setErrors] = useState({
//     name: "",
//     mobileNo: "",
//     email: "",
//     address: "",
//   });

//   const validateStep1 = () => {
//     const newErrors = {
//       name: "",
//       mobileNo: "",
//       email: "",
//     };
//     let isValid = true;

//     if (!form.name.trim()) {
//       newErrors.name = "Name is required";
//       isValid = false;
//     } else if (!/^[a-zA-Z\s]+$/.test(form.name)) {
//       newErrors.name = "Name should contain only letters";
//       isValid = false;
//     }

//     if (!form.mobileNo.trim()) {
//       newErrors.mobileNo = "Mobile number is required";
//       isValid = false;
//     } else if (!/^\d{10}$/.test(form.mobileNo)) {
//       newErrors.mobileNo = "Please enter a valid 10-digit mobile number";
//       isValid = false;
//     }

//     if (!form.email.trim()) {
//       newErrors.email = "Email is required";
//       isValid = false;
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
//       newErrors.email = "Please enter a valid email address";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const validateStep2 = () => {
//     const newErrors = {
//       ...errors,
//       address: "",
//     };
//     let isValid = true;

//     if (!form.address.trim()) {
//       newErrors.address = "Address is required";
//       isValid = false;
//     } else if (form.address.trim().length < 10) {
//       newErrors.address = "Address should be at least 10 characters";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleNext = () => {
//     if (step === 1 && !validateStep1()) return;
//     if (step === 2 && !validateStep2()) return;
//     setStep((s) => s + 1);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Final validation before submission
//     if (!validateStep1() || !validateStep2()) {
//       toast.error("Please fix all errors before submitting", {
//         position: "top-right",
//         autoClose: 5000,
//       });
//       return;
//     }

//     const orderSummary = `
//       Name: ${form.name}
//       Mobile: ${form.mobileNo}
//       Email: ${form.email}
//       Address: ${form.address}
//       Payment: ${form.payment}
//       Items: ${cartItems.map((i) => i.name).join(", ")}
//     `;

//     // Show success toast
//     toast.success("Order placed successfully!", {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//     });

//     // Clear cart if you have that functionality
//     // clearCart();

//     // Reset form
//     setForm({
//       name: "",
//       mobileNo: "",
//       email: "",
//       address: "",
//       payment: "cod",
//     });

//     // Reset to step 1
//     setStep(1);

//     // Navigate to home after successful submission
//     navigate("/");
//   };

//   const prevStep = () => setStep((s) => s - 1);
//   const handleNameChange = (e) => {
//     const value = e.target.value;
//     if (/^[a-zA-Z\s]*$/.test(value)) {
//       setForm({ ...form, name: value });
//       setErrors({ ...errors, name: "" });
//     }
//   };

//   // Handle mobile number input - allow only numbers and limit to 10 digits
//   const handleMobileChange = (e) => {
//     const value = e.target.value;
//     if (/^\d*$/.test(value) && value.length <= 10) {
//       setForm({ ...form, mobileNo: value });
//       setErrors({ ...errors, mobileNo: "" });
//     }
//   };

//   return (
//     <div className="checkout-container">
//       <div className="card">
//         <div className="card-header">
//           <h2>Checkout</h2>
//           <p>Step {step} of 3</p>
//         </div>

//         <div className="card-body">
//           <form onSubmit={handleSubmit} className="step-form">
//             {step === 1 && (
//               <>
//                 <div className="form-group">
//                   <label>Name:</label>
//                   <input
//                     className={`form-input ${errors.name ? "error" : ""}`}
//                     required
//                     placeholder="Enter Your Name"
//                     value={form.name}
//                     onChange={handleNameChange}
//                   />
//                   {errors.name && (
//                     <span className="error-message">{errors.name}</span>
//                   )}
//                 </div>
//                 <div className="form-group">
//                   <label>Mobile:</label>
//                   <input
//                     className={`form-input ${errors.mobileNo ? "error" : ""}`}
//                     required
//                     placeholder="Enter Mobile Number"
//                     value={form.mobileNo}
//                     onChange={handleMobileChange}
//                     type="tel"
//                   />
//                   {errors.mobileNo && (
//                     <span className="error-message">{errors.mobileNo}</span>
//                   )}
//                 </div>
//                 <div className="form-group">
//                   <label>Email:</label>
//                   <input
//                     className={`form-input ${errors.email ? "error" : ""}`}
//                     required
//                     type="email"
//                     placeholder="Enter Email Address"
//                     value={form.email}
//                     onChange={(e) =>
//                       setForm({ ...form, email: e.target.value })
//                     }
//                   />
//                   {errors.email && (
//                     <span className="error-message">{errors.email}</span>
//                   )}
//                 </div>
//                 <div className="form-actions">
//                   <button
//                     type="button"
//                     className="btn nextBtn"
//                     onClick={handleNext}
//                   >
//                     <span style={{ color: "white" }}>Next</span>
//                   </button>
//                 </div>
//               </>
//             )}

//             {step === 2 && (
//               <>
//                 <div className="form-group">
//                   <label>Address:</label>
//                   <textarea
//                     className={`form-textarea ${errors.address ? "error" : ""}`}
//                     required
//                     placeholder="Delivery Address"
//                     value={form.address}
//                     onChange={(e) =>
//                       setForm({ ...form, address: e.target.value })
//                     }
//                   />
//                   {errors.address && (
//                     <span className="error-message">{errors.address}</span>
//                   )}
//                 </div>
//                 <div className="form-group">
//                   <label>Payment:</label>
//                   <select
//                     className="form-select"
//                     value={form.payment}
//                     onChange={(e) =>
//                       setForm({ ...form, payment: e.target.value })
//                     }
//                   >
//                     <option value="cod">Cash on Delivery</option>
//                     <option value="prepaid">Prepaid</option>
//                   </select>
//                 </div>
//                 <div className="form-actions">
//                   <button
//                     type="button"
//                     className="btn backBtn"
//                     onClick={prevStep}
//                   >
//                     Back
//                   </button>
//                   <button
//                     type="button"
//                     className="btn nextBtn"
//                     onClick={handleNext}
//                   >
//                     <span style={{ color: "white" }}>Next</span>
//                   </button>
//                 </div>
//               </>
//             )}
//             {step === 3 && (
//               <>
//                 <h4 className="review-title">Review Order</h4>
//                 <div className="responsive-table-container">
//                   <table className="order-review-table">
//                     <tbody>
//                       <tr>
//                         <th>Name:</th>
//                         <td>{form.name}</td>
//                       </tr>
//                       <tr>
//                         <th>Mobile No:</th>
//                         <td>{form.mobileNo}</td>
//                       </tr>
//                       <tr>
//                         <th>Email:</th>
//                         <td>{form.email}</td>
//                       </tr>
//                       <tr>
//                         <th>Address:</th>
//                         <td>{form.address}</td>
//                       </tr>
//                       <tr>
//                         <th>Payment:</th>
//                         <td>
//                           {form.payment === "cod"
//                             ? "Cash on Delivery"
//                             : "Prepaid"}
//                         </td>
//                       </tr>
//                       <tr>
//                         <th>Items:</th>
//                         <td>
//                           <ul className="items-list">
//                             {cartItems.map((item, index) => (
//                               <li key={index}>
//                                 {item.name}{" "}
//                                 {item.quantity && `(Qty: ${item.quantity})`}
//                               </li>
//                             ))}
//                           </ul>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>

//                 <div className="form-actions">
//                   <button
//                     type="button"
//                     className="btn backBtn"
//                     onClick={prevStep}
//                   >
//                     Back
//                   </button>
//                   <button type="submit" className="btn plsOrder">
//                     Place Order
//                   </button>
//                 </div>
//               </>
//             )}
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;
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
  const [errors, setErrors] = useState({
    name: "",
    mobileNo: "",
    email: "",
    address: "",
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
    };
    let isValid = true;

    if (!form.address.trim()) {
      newErrors.address = "Delivery address is required";
      isValid = false;
    } else if (form.address.trim().length < 10) {
      newErrors.address = "Address should be at least 10 characters";
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

    const orderSummary = `
      Name: ${form.name}
      Mobile: ${form.mobileNo}
      Email: ${form.email}
      Address: ${form.address}
      Payment: ${form.payment}
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

  return (
    <div className="checkout-container">
      <div className="card">
        <div className="card-header">
          <h2>Checkout</h2>
          <div className="stepper">
            <div className={`step ${step >= 1 ? "active" : ""}`}>
              <span>1</span>
              <p>Personal Info</p>
            </div>
            <div className={`step ${step >= 2 ? "active" : ""}`}>
              <span>2</span>
              <p>Delivery Info</p>
            </div>
            <div className={`step ${step >= 3 ? "active" : ""}`}>
              <span>3</span>
              <p>Review Order</p>
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
                    <option value="prepaid">Online Payment</option>
                  </select>
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
                        <th>Payment Method:</th>
                        <td>
                          {form.payment === "cod"
                            ? "Cash on Delivery"
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

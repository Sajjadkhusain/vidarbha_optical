import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/NotFoundPage.css";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Page Not Found</h2>
        <p className="error-message">
          The page you are looking for doesn't exist.
        </p>
        <Link to="/" className="back-to-home-btn">
          <FaArrowLeft /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

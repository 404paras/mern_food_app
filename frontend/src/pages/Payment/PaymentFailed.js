
import React from "react";
import { Link } from "react-router-dom";
import "../../styles/PaymentFailed.css"; // Ensure you have a CSS file for styles

const PaymentFailed = () => {
  return (
    <div className="payment-failed-container">
      <h2>Payment Failed</h2>
      <p>
        Sorry, your payment could not be processed successfully. Please check
        the details and try again.
      </p>
      <div className="suggestions">
        <p>
          Here are a few things you can try:
        </p>
        <ul>
          <li>Ensure your card details are correct.</li>
          <li>Check your internet connection.</li>
          <li>Contact your bank for assistance.</li>
        </ul>
      </div>
      <Link to="/" className="btn">
        Back to Home
      </Link>
    </div>
  );
};

export default PaymentFailed;

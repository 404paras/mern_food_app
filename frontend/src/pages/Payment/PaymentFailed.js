import React from "react";
import { Link } from "react-router-dom";
import "../../styles/PaymentFailed.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice.js"

const PaymentFailed = () => {

const navigate = useNavigate();

const dispatch = useDispatch();
  
const logOutHandler = () => {
  sessionStorage.clear();
  navigate('/')
  dispatch(logout());
};
  return (
    <div className="payment-failed-container">
      <h2>Payment Failed</h2>
      <p>
        Sorry, your payment could not be processed successfully. Please check
        the details and try again.
      </p>
      <div className="suggestions">
        <p>Here are a few things you can try:</p>
        <ul>
          <li>Ensure your card details are correct.</li>
          <li>Check your internet connection.</li>
          <li>Contact your bank for assistance.</li>
        </ul>
      </div>
      <div className="actions">
        <Link to="/" className="btn">
          Back to Home
        </Link>
        <Link to="/" className="btn" onClick={logOutHandler}>
          Try to Login Again
        </Link>
      </div>
    </div>
  );
};

export default PaymentFailed;

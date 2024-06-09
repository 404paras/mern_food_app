import React from "react";
import { Link,useParams } from "react-router-dom";
import "../../styles/PaymentSuccess.css"; // Assuming you have a CSS file for styles


const PaymentSuccess = () => {
const {orderId,paymentId,amount} = useParams();


  return (
    <div className="payment-success-container">
      <div className="payment-success-card">
        <h1>Payment Successful!</h1>
        <p>Thank you for your purchase.</p>
        <div className="order-details">
          <p><strong>Order ID:</strong> {orderId}</p>
          <p><strong>Payment ID:</strong>{paymentId}</p>
          <p><strong>Total Amount:</strong> ₹{amount/100}</p>
        </div>
        <div className="payment-success-actions">
          <Link to="/" className="btn">
            Continue Shopping
          </Link>
        
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;

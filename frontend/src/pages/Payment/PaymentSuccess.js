import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../styles/PaymentSuccess.css"; // Assuming you have a CSS file for styles
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { server } from "../../server"; // Ensure this points to your server URL
import { clearCart } from "../../store/cartItemsSlice";

const PaymentSuccess = () => {
  const { orderId, paymentId, amount } = useParams();
  const { foodItems } = useSelector((state) => state.cart);
  const { id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
const [count,setCount] = useState(0);
  useEffect(() => {
    const createOrder = async () => {
      if (foodItems && foodItems.itemDetail) {
        const food = foodItems.itemDetail.map((item) => ({
          id: item.id,
          count: item.count,
        }));
        try {
          const response = await axios.post(`${server}api/v1/order`, {
            orderId,
            transactionId: paymentId,
            userId: id,
            payment: amount / 100, // Ensure payment is in the correct format
            foodItems: food,
          });
          console.log("Order created successfully:", response.data);
          dispatch(clearCart());
        } catch (error) {
          console.error("Failed to create order:", error);
        }
      }
    };
if(count===0){
    createOrder(); // Call createOrder inside useEffect
setCount(1);
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className="payment-success-container">
      <div className="payment-success-card">
        <h1>Payment Successful!</h1>
        <p>Thank you for your purchase.</p>
        <div className="order-details">
          <p>
            <strong>Order ID:</strong> {orderId}
          </p>
          <p>
            <strong>Payment ID:</strong> {paymentId}
          </p>
          <p>
            <strong>Total Amount:</strong> ₹{amount / 100}
          </p>
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

// Payment.js

import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { server } from "../../server";
import "../../styles/Payment.css";
import { useSelector } from "react-redux";

const Payment = () => {
  const userInfo = useSelector((state) => state.auth);
  const { orderId, price } = useParams();
  const navigate = useNavigate();

  const orderUrl = `${server}create_order`;
  const verifyUrl = `${server}verify_payment`;
  const key_id = "rzp_test_RacGQw3EN9fQH1";

  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handlePayment = async () => {
    const orderData = {
      amount: price * 100, // Amount in paise (Razorpay expects amount in smallest currency unit)
      currency: "INR",
      receipt: orderId,
    };

    try {
      const orderResponse = await axios.post(orderUrl, orderData);

      const { id: order_id, amount, currency } = orderResponse.data;

      const options = {
        key: key_id,
        amount,
        currency,
        name: "Food Mern",
        description: "Test Transaction",
        order_id,
        handler: async function (response) {
          console.log("Payment Response:", response);
          const paymentData = {
            order_id,
            payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            amount: amount,
          };

          try {
            const verifyResponse = await axios.post(verifyUrl, paymentData);
            console.log("Verify Response:", verifyResponse.data);
            if (verifyResponse.data.status === "success") {
              navigate(
                `/success/${encodeURIComponent(
                  verifyResponse.data.order_id
                )}/${encodeURIComponent(
                  verifyResponse.data.payment_id
                )}/${encodeURIComponent(verifyResponse.data.amount)}`
              );
            } else {
              navigate("/payment-failed"); // Navigate to payment failed page
            }
          } catch (error) {
            console.error(
              "Verification Error:",
              error.response ? error.response.data : error.message
            );
            navigate("/payment-failed"); // Navigate to payment failed page on error
          }
        },
        prefill: {
          name: userInfo.name,
          email: userInfo.email,
          contact: userInfo.phone,
        },
        notes: {
          address:
            `${address.street}, ${address.city}, ${address.state} - ${address.pincode}` ||
            "",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(
        "Order Error:",
        error.response ? error.response.data : error.message
      );
      navigate("/payment-failed"); // Navigate to payment failed page on order creation error
    }
  };

  const handleAddressChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="payment-container">
      <div className="address-form">
        <h2>Delivery Address</h2>
        <form>
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={address.street}
            onChange={handleAddressChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleAddressChange}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={address.state}
            onChange={handleAddressChange}
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={address.pincode}
            onChange={handleAddressChange}
          />
          <button
            type="button"
            className="payment-submit-button"
            onClick={handlePayment}
          >
            Pay ₹{price}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;

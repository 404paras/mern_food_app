import React, { useState, useEffect } from "react";
import { getAllOffers } from "../Data/Data";
import Shimmer from "../components/Shimmer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/UserOffers.css"; // Import the CSS file

const UserOffers = () => {
  const [offers, setOffers] = useState();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const offersData = await getAllOffers();
        setOffers(offersData);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };
    if (!offers) {
      fetchOffers();
    }
  }, [offers]);

  const notifyCopied = () => toast.success("Coupon code copied to clipboard!");

  if (!offers) {
    return <Shimmer />;
  }

  if (offers.length === 0) {
    return (
      <div className="user-offers-container">
        <h2>Available Offers</h2>
        <p style={{ marginTop: "2rem", color: "#718096", textAlign: "center" }}>
          No offers available right now. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div className="user-offers-container">
      <h2>Available Offers</h2>
      <ul className="offer-list">
        {offers.map((offer, index) => (
          <li key={index} className="offer-item">
            <div className="offer-details">
              <span className="coupon-code">Coupon Code:</span>{" "}
              <span className="coupon-pill">{offer.couponcode}</span>
            </div>
            <div className="offer-details">
              <span className="discount">Discount:</span>{" "}
              <span className="discount-badge">{offer.discount}% OFF</span>
            </div>
            <div className="offer-details">
              <span className="description">Description: </span>{offer.description}
            </div>
            <button
              className="copy-button"
              onClick={() => {
                // Function to copy coupon code to clipboard
                navigator.clipboard.writeText(offer.couponcode);
                notifyCopied(); // Show toast notification
              }}
            >
              Copy Coupon Code
            </button>
          </li>
        ))}
      </ul>
      <ToastContainer /> {/* Toast container for notifications */}
    </div>
  );
};

export default UserOffers;

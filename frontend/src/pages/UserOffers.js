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
        console.log(offersData, offers);
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

  return (
    <div className="user-offers-container">
      <h2>Available Offers</h2>
      <ul className="offer-list">
        {offers.map((offer, index) => (
          <li key={index} className="offer-item">
            <div className="offer-details">
              <span className="coupon-code">Coupon Code:</span>{" "}
              {offer.couponcode}
            </div>
            <div className="offer-details">
              <span className="discount">Discount:</span> {offer.discount}%
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

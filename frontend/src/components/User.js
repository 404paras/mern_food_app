import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../server";
import "../styles/userInfo.css";
import { getUserOrders } from "../Data/Data";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../store/authSlice.js";

const User = () => {
  const [option, setOption] = useState("profile");
  const [profileData, setProfileData] = useState({});
  const [originalProfileData, setOriginalProfileData] = useState({});
  const [profileEdit, setProfileEdit] = useState(false);
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [filter, setFilter] = useState("");

  const userData = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = () => {
    sessionStorage.clear();
    navigate("/");
    dispatch(logout());
  };

  const fetchOrders = async () => {
    try {
      const data = await getUserOrders({ userId: userData.id }, {});
      if (data === "401") {
        logOutHandler();
        navigate("/");
      } else {
        setOrders(data);
        setAllOrders(data);
        
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (option === "orders" && allOrders.length === 0) {
      fetchOrders();
    }
    setProfileData(userData);
    setOriginalProfileData(userData);
  }, [userData, allOrders.length, option]);

  const filterOrders = (filter) => {
    if (filter === "pending") {
      setOrders(allOrders.filter((order) => order.status.toLowerCase() === "pending"));
    } else if (filter === "delivered") {
      setOrders(allOrders.filter((order) => order.status.toLowerCase() === "delivered"));
    } else {
      setOrders([...allOrders].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)));
    }
    setFilter(filter);
  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProfileEdit = async () => {
    try {
      const response = await axios.put(
        `${server}api/v1/user/update/${userData.id}`,
        {
          name: profileData.name,
          email: profileData.email,
          phone: profileData.phone,
        }
      );

      if (response.status === 200) {
        alert("Profile updated successfully");
        setProfileEdit(false);
        setOriginalProfileData(profileData);
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  const handleCancel = () => {
    setProfileData(originalProfileData);
    setProfileEdit(false);
  };

  return (
    <div className="user-info">
      <div className="user-info-header">
        <h1>User Dashboard</h1>
      </div>
      <div className="user-info-btns">
        <button
          className={option === "profile" ? "active" : ""}
          onClick={() => setOption("profile")}
        >
          My Profile
        </button>
        <button
          className={option === "orders" ? "active" : ""}
          onClick={() => setOption("orders")}
        >
          My Orders
        </button>
      </div>
      <div className="user-data">
        {option === "profile" ? (
          <div className="profile-info">
            <h2>Profile Information</h2>
            <div className="profile-item">
              <label>Name:</label>
              {profileEdit ? (
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={inputChangeHandler}
                  style={{borderBottom:"1px solid black"}}
                />
              ) : (
                <span>{profileData.name}</span>
              )}
            </div>
            <div className="profile-item">
              <label>Email:</label>
              <span>{profileData.email}</span>
            </div>
            <div className="profile-item">
              <label>Phone:</label>
              {profileEdit ? (
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={inputChangeHandler}
                  
                  style={{borderBottom:"1px solid black"}}
                />
              ) : (
                <span>{profileData.phone}</span>
              )}
            </div>
            {!profileEdit ? (
              <button
                className="edit-profile-btn"
                onClick={() => setProfileEdit(true)}
              >
                Edit Profile
              </button>
            ) : (
              <div className="profile-btns">
                <button onClick={handleProfileEdit} className="save">
                  Save
                </button>
                <button onClick={handleCancel} className="cancel">
                  Cancel
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="order-info">
            <div className="order-filters">
              <h2>Order History</h2>
              <div className="filter-btns">
                <button
                  className={filter === "pending" ? "active" : ""}
                  onClick={() => filterOrders("pending")}
                >
                  Pending
                </button>
                <button
                  className={filter === "delivered" ? "active" : ""}
                  onClick={() => filterOrders("delivered")}
                >
                  Delivered
                </button>
                <button
                  className={filter === "recent" ? "active" : ""}
                  onClick={() => filterOrders("recent")}
                >
                  Most Recent
                </button>
              </div>
            </div>
            {orders && orders.length > 0 ? (
              <ul>
                {orders.map((order, index) => (
                  <li key={index}>
                    <div className="order-item">
                      <p>
                        <strong>Order ID:</strong> {order.orderId}
                      </p>
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(order.updatedAt).toLocaleString()}
                      </p>
                      <p>
                        <strong>Transaction Id:</strong> {order.transactionId}
                      </p>
                      <p>
                        <strong>Total:</strong> {order.payment} Rs
                      </p>
                      <p>
                        <strong>Status:</strong>{" "}
                        <span className={order.status==="pending"?'Pending':order.status}>{order.status==="pending"?'Pending':order.status}</span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No orders found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default User;

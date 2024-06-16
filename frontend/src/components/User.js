import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { server } from '../server';
import '../styles/userInfo.css';
import { getUserOrders } from '../Data/Data';

const User = () => {
  const [option, setOption] = useState('profile');
  const [profileData, setProfileData] = useState({});
  const [originalProfileData, setOriginalProfileData] = useState({});
  const [profileEdit, setProfileEdit] = useState(false);
  const [orders, setOrders] = useState('');

  const userData = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getUserOrders({ userId: userData.id });
      console.log(data);
      setOrders(data);
    };

    if (option === 'orders' && orders === '') {
      console.log(userData.id);
      fetchOrders();
    }
    setProfileData(userData);
    setOriginalProfileData(userData);
  }, [userData, orders, option]);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProfileEdit = async () => {
    try {
      const response = await axios.put(`${server}api/v1/user/update/${userData.id}`, {
        name: profileData.name,
        email: profileData.email,
        phone: profileData.phone,
      });

      if (response.status === 200) {
        alert('Profile updated successfully');
        setProfileEdit(false);
        setOriginalProfileData(profileData); // Update original data with new changes if needed
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handleCancel = () => {
    setProfileData(originalProfileData); // Reset to original profile data
    setProfileEdit(false);
  };

  const formatStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'status-pending';
      case 'completed':
        return 'status-completed';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  return (
    <div className="user-info">
      <div className="user-info-header">
        <h1>User Dashboard</h1>
      </div>
      <div className="user-info-btns">
        <button
          className={option === 'profile' ? 'active' : ''}
          onClick={() => setOption('profile')}
        >
          My Profile
        </button>
        <button
          className={option === 'orders' ? 'active' : ''}
          onClick={() => setOption('orders')}
        >
          My Orders
        </button>
      </div>
      <div className="user-data">
        {option === 'profile' ? (
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
                />
              ) : (
                <span>{profileData.phone}</span>
              )}
            </div>
            {!profileEdit ? (
              <button className="edit-profile-btn" onClick={() => setProfileEdit(true)}>
                Edit Profile
              </button>
            ) : (
              <div className="profile-btns">
                <button onClick={handleProfileEdit} className="save">Save</button>
                <button onClick={handleCancel} className="cancel">Cancel</button>
              </div>
            )}
          </div>
        ) : (
          <div className="order-info">
            <h2>Order History</h2>
            {orders && orders.length > 0 ? (
              <ul>
                {orders.map((order, index) => (
                  <li key={index}>
                    <div className="order-item">
                      <p>
                        <strong>Order ID:</strong> {order.orderId}
                      </p>
                      <p>
                        <strong>Date:</strong> {new Date(order.updatedAt).toLocaleString()}
                      </p>
                      <p>
                        <strong>Transaction Id:</strong> {order.transactionId}
                      </p>
                      <p>
                        <strong>Total:</strong> {order.payment} Rs
                      </p>
                      <p>
                        <strong>Status:</strong> <span className={`status ${getStatusClass(order.status)}`}>{formatStatus(order.status)}</span>
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

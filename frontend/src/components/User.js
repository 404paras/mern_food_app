import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/User.css";

const User = () => {
  const user = useSelector((state) => state.auth);
  console.log(user)
  // const orders = useSelector((state) => state.user.orders);
  const orders = [{ id: 1, date: "2023-05-15", total: 1200, status: "Delivered" }];
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: user.name,
    email: user.email,
    address: user.address,
    phone: user.phone,
  });
  const [initialUserInfo, setInitialUserInfo] = useState(userInfo);

  /**
  useEffect(() => {
    dispatch(fetchUserOrders(userContext.id));
  }, [dispatch, userContext.id]);
  */

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // dispatch(updateUserDetails(userInfo));
    setEditMode(false);
    setInitialUserInfo(userInfo);
  };

  const handleCancel = () => {
    setUserInfo(initialUserInfo);
    setEditMode(false);
  };

  return (
    <div className="user-info-container">
      <h2>User Information</h2>
      <div className="user-info">
        {editMode ? (
          <div className="user-edit-info">
            <div className="user-info-row">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="user-info-row">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="user-info-row">
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={userInfo.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="user-info-row">
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={userInfo.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="user-button-group">
              <button className="user-btn" onClick={handleSave}>Save</button>
              <button className="user-btn" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="user-display-info">
            <div className="user-info-row">
              <label>Name:</label>
              <span>{userInfo.name}</span>
            </div>
            <div className="user-info-row">
              <label>Email:</label>
              <span>{userInfo.email}</span>
            </div>
            <div className="user-info-row">
              <label>Address:</label>
              <span>{userInfo.address}</span>
            </div>
            <div className="user-info-row">
              <label>Phone:</label>
              <span>{userInfo.phone}</span>
            </div>
            <button className="user-btn" onClick={() => setEditMode(true)}>Edit</button>
          </div>
        )}
      </div>

      <h2>Past Orders</h2>
      {orders && orders.length > 0 && (
        <div className="user-orders-list">
          {orders.map((order) => (
            <div key={order.id} className="user-order-item">
              <p>Order ID: {order.id}</p>
              <p>Date: {order.date}</p>
              <p>Total: ₹{order.total}</p>
              <p>Status: {order.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default User;

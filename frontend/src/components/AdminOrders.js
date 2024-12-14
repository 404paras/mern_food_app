import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AdminOrders.css";
import { server } from "../server";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [filter, setFilter] = useState("recent");
  const token = sessionStorage.getItem("token");



  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${server}api/v1/order/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
      setAllOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `${server}api/v1/order/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Order status updated to "${newStatus}" successfully.`);
      fetchOrders();
    } catch (error) {
      alert("Unable to change order status.");
      console.error("Error during status update:", error);
    }
  };

  const filterOrders = (filterOption) => {
    switch (filterOption) {
      case "pending":
        setOrders(allOrders.filter((order) => order.status.toLowerCase() === "pending"));
        break;
      case "delivered":
        setOrders(allOrders.filter((order) => order.status.toLowerCase() === "delivered"));
        break;
      case "recent":
      default:
        setOrders([...allOrders].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)));
    }
    setFilter(filterOption);
  };

  return (
    <div className="admin-orders-container">
  
      <div className="order-filters">
        <h2>Admin Orders</h2>
        <div className="filter-btns">
          {["recent", "pending", "delivered"].map((opt) => (
            <button
              key={opt}
              className={filter === opt ? "active" : ""}
              onClick={() => filterOrders(opt)}
            >
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="orders-list">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="order-item">
             
              <div className="order-details">
                <p><strong>Order ID:</strong> {order.orderId}</p>
                <p>
                  <strong>Status:</strong> <span  className={`${order.status==="pending"?"Pending":order.status}`}>{`${order.status==="pending"?"Pending":order.status}`}</span>
                </p>
                <p><strong>User ID:</strong> {order.userId}</p>
                <p><strong>Payment:</strong> Rs {order.payment}</p>
                <p>
                  <strong>Food Items:</strong>
                  
                  <ul className="food-items">
                    {order.foodItems.map((item, index) => (
                      <li key={index}>{item.item} x {item.count}</li>
                    ))}
                  </ul>
                </p>
                <p><strong>Transaction ID:</strong> {order.transactionId}</p>
              </div>

              <div className="status-update-section">
                <select
                  className="status-dropdown"
                  defaultValue={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  {["Pending", "Delivered"].map((statusOption) => (
                    <option key={statusOption} value={statusOption}>
                      {statusOption}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))
        ) : (
          <p className="no-orders">No orders found. Please check back later.</p>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;

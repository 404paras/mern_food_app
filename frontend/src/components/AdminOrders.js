import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminOrders.css';
import { server } from '../server';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState('');
    const [status, setStatus] = useState('pending');
    const [statusOptions] = useState(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${server}api/v1/order/admin/all`);
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleStatusChange = async () => {
        try {
            const response = await axios.put(`${server}api/v1/order/${selectedOrderId}/status`, { status });
            console.log('Order status updated successfully:', response.data);
            fetchOrders();
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    return (
        <div className="admin-orders-container">
            <h2>Admin Orders</h2>
            <div className="orders-list">
                {orders.map(order => (
                    <div key={order._id} className="order-item">
                        <div>
                            <strong>Order ID:</strong> {order.orderId}
                        </div>
                        <div>
                            <strong>Status:</strong> {order.status}
                        </div>
                        <div>
                            <strong>User ID:</strong> {order.userId}
                        </div>
                        <div>
                            <strong>Payment:</strong> {order.payment}
                        </div>
                        <div>
                            <strong>Food Items:</strong>
                            <ul>
                                {order.foodItems.map((item, index) => (
                                    <li key={index}>{item.item} - {item.count}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <strong>Transaction ID:</strong> {order.transactionId}
                        </div>
                        <div className="status-update-section">
                            <label>Select Status:</label>
                            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                {statusOptions.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                            <button onClick={() => {
                                setSelectedOrderId(order._id);
                                handleStatusChange();
                            }}>Update Status</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminOrders;

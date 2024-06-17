import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../server.js';
import { MdDelete } from "react-icons/md";
import { CiSearch } from 'react-icons/ci';
import {getUserOrders} from '../Data/Data.js'
import '../styles/CustomerAdmin.css'

const CustomerAdmin = () => {
    const [customers, setCustomers] = useState([]);
    const [allCustomers, setAllCustomers] = useState([]);
    const [search, setSearch] = useState('');
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [orderData, setOrderData] = useState([]);

    const changeHandler = (e) => {
        setSearch(e.target.value);
        if (e.target.value === '') {
            setCustomers(allCustomers);
        }
    };

    useEffect(() => {
        const getCustomers = async () => {
            try {
                const { data } = await axios.get(`${server}api/v1/getAllUsers`);
                setCustomers(data.users);
                setAllCustomers(data.users);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };
        getCustomers();
    }, []);

    const searchRequest = () => {
        if (search.trim() !== '') {
            const filteredCustomers = allCustomers.filter(customer =>
                customer.name.toLowerCase().includes(search.toLowerCase()) ||
                customer.email.toLowerCase().includes(search.toLowerCase())
            );
            setCustomers(filteredCustomers);
        } else {
            setCustomers(allCustomers);
        }
    };

    const handleDeleteCustomer = async (customerId) => {
        try {
            await axios.delete(`${server}api/v1/deleteUser/${customerId}`);
            setCustomers(customers.filter(customer => customer._id !== customerId));
            setAllCustomers(allCustomers.filter(customer => customer._id !== customerId));
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    const seeCustomerOrder = async(customerId,name)=>{
        console.log(customerId)
        try {
            const data = await getUserOrders({userId:customerId})
            console.log(data)
            setOrderData(data); // Assuming `data` is an array of orders
            setSelectedCustomer({customerId,name});
            setShowOrderModal(true);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }

    if (customers.length === 0 && search==='') {
        return (<div className="no-customer">No customer to display!</div>);
    }

    return (
        <div className="customer-admin-container">
            <h2 className="customer-admin-heading">Customer List</h2>
            <div className="customer-search-bar-container">
                <div className="customer-search-bar">
                    <input
                        type="text"
                        name="search"
                        placeholder="Search by name or email"
                        value={search}
                        onChange={changeHandler}
                    />
                    <button onClick={searchRequest}><CiSearch />&nbsp; Search</button>
                </div>
            </div>

            {customers.length > 0 ? customers.map((customer, index) => (
                <div key={index} className="customer-details">
                    <h3 className="customer-name">Name : {customer.name}</h3>
                    <p className="customer-email">Email : {customer.email}</p>
                    <p className="customer-mobile">Mobile : {customer?.mobile || 'Mobile Number not available'}</p>
                    <p className="customer-address">Address : {customer?.address || 'Address not available'}</p>
                    <div className="customer-buttons">
                        <button className="delete-button" onClick={() => handleDeleteCustomer(customer._id)}>
                            <MdDelete className="delete-icon" /> Delete
                        </button>
                        <button className="view-history-button" onClick={()=>seeCustomerOrder(customer._id,customer.name)}>
                            View Order History
                        </button>
                    </div>
                </div>
            )) :
                <h2 className="no-user">No user found !!</h2>
            }

            {/* Modal for Order History */}
            {showOrderModal && (
                <div className="overlay">
                    <div className="modal">
                        <h2>Order History of {selectedCustomer.name}</h2>
                        <CustomerOrder data={orderData} />

                        <button onClick={() => setShowOrderModal(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerAdmin;

export const CustomerOrder = ({ data }) => {
    return (
        <div className="customerOrders">
            <ul>
                {data.map((order, index) => (
                    <li key={index}>
                        <p>Order ID: {order.orderId}</p>
                        <p>Order Date: {new Date(order.updatedAt).toLocaleString()}</p>
                        <p>Transaction Id : {order.transactionId}</p>
                        <br />
                    </li>
                ))}
            </ul>
        </div>
    );
};


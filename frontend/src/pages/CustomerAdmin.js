import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../server.js';
import { MdDelete } from "react-icons/md";
import { CiSearch } from 'react-icons/ci';
import '../styles/CustomerAdmin.css';

const CustomerAdmin = () => {
    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState('');

    const changeHandler = (e) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        const getCustomers = async () => {
            try {
                const { data } = await axios.get(`${server}api/v1/getAllUsers`);
                setCustomers(data.users);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };
        getCustomers();
    }, [search]);

    const searchRequest = () => {
        const user = customers.filter(customer => (customer.name === search || customer.email === search));
        setCustomers(user);
    }

    const handleDeleteCustomer = async (customerId) => {
        try {
            await axios.delete(`${server}api/v1/deleteUser/${customerId}`);
            setCustomers(customers.filter(customer => customer._id !== customerId));
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    if (customers.length === 0) {
        return (<div className="no-customer">No customer to display!</div>)
    }

    return (
        <div className="customer-admin-container">
            <h2 className="customer-admin-heading">Customer List</h2>
            <div className="customer-search-bar-container">
                <div className="customer-search-bar">
                    <input
                        type="text"
                        name="search"
                        placeholder='Search by name or email'
                        value={search}
                        onChange={changeHandler}
                    />
                    <button onClick={searchRequest}><CiSearch />&nbsp; Search</button>
                </div>
            </div>

            {customers ? customers.map((customer, index) => (
                <div key={index} className="customer-details">
                    <h3 className="customer-name">Name : {customer.name}</h3>
                    <p className="customer-email">Email : {customer.email}</p>
                    <p className="customer-mobile">Mobile : {customer?.mobile || 'Mobile Number not available'}</p>
                    <p className="customer-address">Address : {customer?.address || 'Address not available'}</p>
                    <div className="customer-buttons">
                        <button className="delete-button" onClick={() => handleDeleteCustomer(customer._id)}>
                            <MdDelete className="delete-icon" /> Delete
                        </button>
                        <button className="view-history-button">
                            View Order History
                        </button>
                    </div>
                </div>
            )) :
                <h2 className="no-user">No user found !!</h2>
            }
        </div>
    );
};

export default CustomerAdmin;

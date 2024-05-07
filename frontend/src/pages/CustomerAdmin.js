import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../server.js';
import { MdDelete } from "react-icons/md";
import { CiSearch } from 'react-icons/ci';
import Shimmer from '../components/Shimmer.js';

const CustomerAdmin = () => {
    const [customers, setCustomers] = useState([]);
    const [search,setSearch] = useState('');
const changeHandler = (e)=>{
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

    const searchRequest = ()=>{
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
    if(customers.length===0){
        return (<Shimmer/>)
    }

    return (
        <div style={{ minHeight: "80vh", width: "70%", margin: "auto", padding: "1rem" }}>
            <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Customer List</h2>
<div style={{margin:"1.5rem"}}>
<div className="search-bar" >
        <input
          type="text"
          name="search"
          placeholder='Search by name or email'
          value={search}
          onChange={changeHandler}
        />
        <button onClick={searchRequest}><CiSearch/>&nbsp; Search</button>
      </div>
</div>

            {customers? customers.map((customer, index) => (
                <div key={index} style={{ marginBottom: "1rem", padding: "1rem", background: "#f4f4f4", borderRadius: "8px", boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)" }}>
                    <h3 style={{ margin: "0" }}>Name : {customer.name}</h3>
                    <p style={{ margin: "0", color: "#666" }}>Email : {customer.email}</p>
                    <p style={{ margin: "0", color: "#666" }}>Mobile : {customer?.mobile || 'Mobile Number not available'}</p>
                    <p style={{ margin: "0", color: "#666" }}>Address : {customer?.address || 'Address not available'}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
                        <button style={{ padding: "0.5rem 1rem", background: "#f44336", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", display: "flex", alignItems: "center" }} onClick={() => handleDeleteCustomer(customer._id)}>
                            <MdDelete style={{ marginRight: "0.5rem" }} /> Delete
                        </button>
                        <button style={{ padding: "0.5rem 1rem", background: "#2196f3", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", display: "flex", alignItems: "center" }}>
                            View Order History
                        </button>
                    </div>
                </div>
            )):
            <h2>No user found !!</h2>
            }
        </div>
    );
};

export default CustomerAdmin;

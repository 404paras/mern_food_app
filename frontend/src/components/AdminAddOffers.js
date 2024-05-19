import React, { useState } from 'react';
import axios from 'axios';
import { server } from '../server.js';
import { MdDelete } from 'react-icons/md';

import '../styles/OfferManagement.css'; // Import CSS file

const OfferManagement = () => {
    const [offers, setOffers] = useState([]);
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState('');

    const handleAddOffer = async () => {
        try {
            const response = await axios.post(`${server}api/v1/addOffer`, {
                couponCode,
                discount
            });
            if (response.data.success) {
                setOffers([...offers, { couponCode, discount }]);
                setCouponCode('');
                setDiscount('');
            }
        } catch (error) {
            console.error('Error adding offer:', error);
        }
    };

    const handleDeleteOffer = async (couponCode) => {
        try {
            await axios.delete(`${server}api/v1/deleteOffer/${couponCode}`);
            setOffers(offers.filter(offer => offer.couponCode !== couponCode));
        } catch (error) {
            console.error('Error deleting offer:', error);
        }
    };

    return (
        <div className="offer-management-container">
            <h2>Offer Management</h2>
            <form className="offer-form" onSubmit={handleAddOffer}>
                <label htmlFor="couponCode">Coupon Code:</label>
                <input
                    type="text"
                    id="couponCode"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    required
                />
                <label htmlFor="discount">Discount (%):</label>
                <input
                    type="number"
                    id="discount"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    required
                />
                <button type="submit">Add Offer</button>
            </form>
            <ul className="offer-list">
                {offers.map((offer, index) => (
                    <li key={index}>
                        <span>Coupon Code: {offer.couponCode}</span>
                        <span>Discount: {offer.discount}%</span>
                        <button onClick={() => handleDeleteOffer(offer.couponCode)}>
                            <MdDelete />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OfferManagement;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { server } from '../server.js';
import '../styles/OfferManagement.css'; // Import CSS file

const AdminAddOffers = () => {
    const [addNewOffer, setAddNewOffer] = useState(false);
    const [newOffer, setNewOffer] = useState({
        code: '',
        discount: '',
        desc: ''
    });
    const [existingOffers, setExistingOffers] = useState([]);
    const [editOffer, setEditOffer] = useState(null);

    // Function to fetch all offers
    const fetchOffers = async () => {
        try {
            const { data } = await axios.get(`${server}api/v1/getAllOffers`);
            setExistingOffers(data);
        } catch (error) {
            console.error('Error fetching offers:', error);
        }
    };

    // useEffect to fetch offers on component mount
    useEffect(() => {
        fetchOffers();
    }, []);

    // Function to handle input change for new offer
    const handleNewOfferInput = (event) => {
        const { name, value } = event.target;
        setNewOffer({ ...newOffer, [name]: value });
    };

    // Function to add new offer
    const handleAddNewOffer = async () => {
        try {
            // Check if all fields are filled
            if (newOffer.code && newOffer.discount && newOffer.desc) {
                // Make POST request to add new offer
                const response = await axios.post(`${server}api/v1/addOrUpdateOffer`, {
                    couponcode: newOffer.code,
                    discount: parseFloat(newOffer.discount),
                    description: newOffer.desc
                });

                if (response.status === 201) {
                    // Offer added successfully
                    console.log('Offer added successfully');
                    // Fetch offers again to update list
                    fetchOffers();
                    // Reset newOffer state and toggle addNewOffer state
                    setNewOffer({
                        code: '',
                        discount: '',
                        desc: ''
                    });
                    setAddNewOffer(false);
                }
            } else {
                console.error('Please fill in all fields.');
            }
        } catch (error) {
            console.error('Error adding new offer:', error);
        }
    };

    // Function to handle edit button click
    const handleEditOffer = (couponcode, discount, description) => {
        setEditOffer({
            couponcode,
            discount,
            description
        });
    };

    // Function to handle save edit button click
    const handleSaveEditOffer = async () => {
        try {
            if (editOffer && editOffer.couponcode && editOffer.discount && editOffer.description) {
                const response = await axios.put(`${server}api/v1/editOffer/${editOffer.couponcode}`, {
                    discount: parseFloat(editOffer.discount),
                    description: editOffer.description
                });

                if (response.status === 200) {
                    console.log('Offer updated successfully');
                    fetchOffers();
                    setEditOffer(null);
                }
            } else {
                console.error('Invalid edit offer data');
            }
        } catch (error) {
            console.error('Error editing offer:', error);
        }
    };

    // Function to handle cancel edit button click
    const handleCancelEditOffer = () => {
        setEditOffer(null);
    };

    // Function to handle delete button click
    const handleDeleteOffer = async (couponcode) => {
        try {
            const response = await axios.delete(`${server}api/v1/deleteOffer/${couponcode}`);
            
            if (response.status === 200) {
                console.log('Offer deleted successfully');
                fetchOffers();
            }
        } catch (error) {
            console.error('Error deleting offer:', error);
        }
    };

    return (
        <div className="admin-add-offers-container">
            <div>AdminAddOffers</div>
            <div>
                {!addNewOffer && (
                    <button className="add-new-offer-button" onClick={() => setAddNewOffer(true)}>Add New Offer</button>
                )}
            </div>
            {addNewOffer && (
                <div className="offer-form">
                    <label htmlFor="couponCode">Coupon Code:</label>
                    <input
                        type="text"
                        id="couponCode"
                        name="code"
                        value={newOffer.code}
                        onChange={handleNewOfferInput}
                    />
                    <label htmlFor="discount">Discount (%):</label>
                    <input
                        type="number"
                        id="discount"
                        name="discount"
                        value={newOffer.discount}
                        onChange={handleNewOfferInput}
                    />
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id="description"
                        name="desc"
                        value={newOffer.desc}
                        onChange={handleNewOfferInput}
                    />
                    <div>
                        <button className="save-button" onClick={handleAddNewOffer}>Save New Offer</button>
                        <button className="cancel-button" onClick={() => setAddNewOffer(false)}>Cancel</button>
                    </div>
                </div>
            )}

            <div className="existing-offers">
                {!editOffer && existingOffers.map((offer, index) => (
                    <div className="offer-item" key={index}>
                        <div>Coupon Code: {offer.couponcode}</div>
                        <div>Discount: {offer.discount}%</div>
                        <div>Description: {offer.description}</div>
                        <button className="edit-button" onClick={() => handleEditOffer(offer.couponcode, offer.discount, offer.description)}>Edit</button>
                        <button className="delete-button" onClick={() => handleDeleteOffer(offer.couponcode)}>Delete</button>
                    </div>
                ))}
            </div>

            {editOffer && (
                <div className="edit-offer-form">
                    <label htmlFor="editCouponCode">Coupon Code:</label>
                    <input
                        type="text"
                        id="editCouponCode"
                        value={editOffer.couponcode}
                        disabled
                    />
                    <label htmlFor="editDiscount">Discount (%):</label>
                    <input
                        type="number"
                        id="editDiscount"
                        value={editOffer.discount}
                        onChange={(e) => setEditOffer({ ...editOffer, discount: e.target.value })}
                    />
                    <label htmlFor="editDescription">Description:</label>
                    <input
                        type="text"
                        id="editDescription"
                        value={editOffer.description}
                        onChange={(e) => setEditOffer({ ...editOffer, description: e.target.value })}
                    />
                    <div>
                        <button className="save-button" onClick={handleSaveEditOffer}>Save</button>
                        <button className="cancel-button" onClick={handleCancelEditOffer}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminAddOffers;

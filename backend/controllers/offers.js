import { Router } from 'express';
import { Offer } from '../models/offers.js';

const offerManagement = new Router();

// Add or update an offer
offerManagement.post('/addOrUpdateOffer', async (req, res) => {
    const { couponcode, discount, description } = req.body;
    try {
        // Check if the same coupon code exists
        const existingOffer = await Offer.findOne({ couponcode });

        if (existingOffer) {
            // If the same coupon code exists, update the discount and description
            existingOffer.discount = discount;
            existingOffer.description = description;
            await existingOffer.save();
            return res.status(200).json({ message: 'Offer updated successfully' });
        } else {
            // If the coupon code doesn't exist, create a new offer
            await Offer.create({ couponcode, discount, description });
            return res.status(201).json({ message: 'Offer added successfully' });
        }
    } catch (error) {
        console.error('Error adding/updating offer:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all offers
offerManagement.get('/getAllOffers', async (req, res) => {
    try {
        // Find all offers
        const offers = await Offer.find();
        return res.status(200).json(offers);
    } catch (error) {
        console.error('Error fetching offers:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Remove an offer
offerManagement.delete('/deleteOffer/:couponcode', async (req, res) => {
    const { couponcode } = req.params;
    try {
        // Find and delete the offer by coupon code
        await Offer.findOneAndDelete({ couponcode });
        return res.status(200).json({ message: 'Offer removed successfully' });
    } catch (error) {
        console.error('Error deleting offer:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Edit an offer
offerManagement.put('/editOffer/:couponcode', async (req, res) => {
    const { couponcode } = req.params;
    const { discount, description } = req.body;
    try {
        // Find the offer by coupon code and update the discount and description
        await Offer.findOneAndUpdate({ couponcode }, { discount, description });
        return res.status(200).json({ message: 'Offer updated successfully' });
    } catch (error) {
        console.error('Error editing offer:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

export default offerManagement;

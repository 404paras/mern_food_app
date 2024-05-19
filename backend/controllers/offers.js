import { Router } from 'express';
import { Offer } from '../models/offers.js';

const offerManagement = new Router();

// Add or update an offer
offerManagement.post('/addOrUpdateOffer', async (req, res) => {
    const { couponcode, discount } = req.body;
    try {
        // Check if the same coupon code exists
        const existingOffer = await Offer.findOne({ couponcode });

        if (existingOffer) {
            // If the same coupon code exists, update the discount
            existingOffer.discount = discount;
            await existingOffer.save();
            return res.status(200).json({ message: 'Offer updated successfully' });
        } else {
            // If the coupon code doesn't exist, create a new offer
            await Offer.create({ couponcode, discount });
            return res.status(201).json({ message: 'Offer added successfully' });
        }
    } catch (error) {
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
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Remove an offer
offerManagement.delete('/removeOffer/:couponcode', async (req, res) => {
    const { couponcode } = req.params;
    try {
        // Find and delete the offer by coupon code
        await Offer.findOneAndDelete({ couponcode });
        return res.status(200).json({ message: 'Offer removed successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Edit an offer
offerManagement.put('/editOffer/:couponcode', async (req, res) => {
    const { couponcode } = req.params;
    const { discount } = req.body;
    try {
        // Find the offer by coupon code and update the discount
        await Offer.findOneAndUpdate({ couponcode }, { discount });
        return res.status(200).json({ message: 'Offer updated successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

export default offerManagement;

import { Router } from 'express';
import { FoodList } from '../models/foodItems.js';

const search = Router();

search.post('/search/:name', async (req, res) => {
    const { name } = req.params;
    const lowercaseName = name.toLowerCase();

    try {
        const searchResults = await FoodList.find({
            $or: [
                { name: { $regex: new RegExp(lowercaseName, 'i') } },
                { category: { $regex: new RegExp(lowercaseName, 'i') } }
            ]
        });

        res.json({ results: searchResults });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default search;

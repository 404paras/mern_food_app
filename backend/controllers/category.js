import Router from 'express';
import { Category } from '../models/categories.js';
import { RestaurantsList } from '../models/restaurant.js';

const categoryRouter = new Router();

categoryRouter.post('/admin/category', async (req, res) => {
    const { type, restaurants } = req.body;
    console.log(type, restaurants);

    try {
        let existingCategory = await Category.findOne({ type });

        if (!existingCategory) {
            existingCategory = await Category.create({ type });
        }

        if (restaurants && restaurants.length > 0) {
            existingCategory.restaurants.push(...restaurants);
            await existingCategory.save();
        }

        res.status(201).json(existingCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

categoryRouter.get('/category/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const category = await Category.findOne({ type:name });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        console.log(category)
        const restaurantIds = category.restaurants;
        if (restaurantIds.length < 1) {
            return res.status(404).json({ message: 'No restaurants available for this category' });
        }
        const restData = [];
        for (const restId of restaurantIds) {
            const data = await RestaurantsList.findById(restId);
            restData.push(data);
        }
        res.status(200).json(restData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

export default categoryRouter;

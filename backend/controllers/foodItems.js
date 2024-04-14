import { Router } from 'express';
import { RestaurantsList } from '../models/restaurant.js';
import { FoodList } from '../models/foodItems.js';

const foodRestaurantList = new Router();

foodRestaurantList.post('/admin/addRestaurant', async (req, res) => {
    const { name, address, imgUrl } = req.body;

    try {
        const restaurant = await RestaurantsList.create({ name, address, imgUrl });
        res.status(200).json({ restaurantId: restaurant._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add restaurant' });
    }
});

foodRestaurantList.post('/admin/addFoodItems', async (req, res) => {
    const { name, description, outlet, category, price, image, restId ,quantity} = req.body;

    try {
        const foodItem = await FoodList.create({ name, description, outlet, category, price, image, restaurant: restId,quantity });
        res.status(200).json({ foodItemId: foodItem._id ,message:"Food Item Added successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add food item' });
    }
});

foodRestaurantList.post('/admin/restaurant', async (req, res) => {
    const { restId, foodItems } = req.body;

    try {
        const restaurant = await RestaurantsList.findById(restId);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        for (const foodItemId of foodItems) {
            const foodItem = await FoodList.findById(foodItemId);
            if (!foodItem) {
                console.error(`Food item with ID ${foodItemId} not found`);
                continue;
            }
            restaurant.foodItems.push(foodItem._id);
        }

        await restaurant.save();
        res.status(200).json({ message: 'Food items added to restaurant successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add food items to restaurant' });
    }
});

foodRestaurantList.get('/getAllRestaurants', async (req, res) => {
    try {
        const restaurants = await RestaurantsList.find();
        res.status(200).json(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch restaurants' });
    }
});

foodRestaurantList.get('/getAllDishOfRestaurant/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const restaurant = await RestaurantsList.findById(id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        const foodItems = await FoodList.find({ _id: { $in: restaurant.foodItems } });
        res.status(200).json({ foodItems });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch food items of restaurant' });
    }
});

foodRestaurantList.delete('/admin/deleteDish/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const foodItem = await FoodList.findByIdAndDelete(id);
        if (!foodItem) {
            return res.status(404).json({ message: 'Food item not found' });
        }

        // Remove the dish from all restaurants' foodItems lists
        await RestaurantsList.updateMany({}, { $pull: { foodItems: id } });

        res.status(200).json({ message: 'Food item deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete food item' });
    }
});

foodRestaurantList.delete('/admin/deleteRestaurant/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const restaurant = await RestaurantsList.findByIdAndDelete(id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        // Delete all associated food items
        await FoodList.deleteMany({ _id: { $in: restaurant.foodItems } });

        res.status(200).json({ message: 'Restaurant and its food items deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete restaurant and its food items' });
    }
});

export default foodRestaurantList;

import { Router } from 'express';
import { RestaurantsList } from '../models/restaurant.js';
import { FoodList } from '../models/foodItems.js';

const foodRestaurantList = new Router();

foodRestaurantList.post('/admin/addRestaurant', async (req, res) => {
    const { name, address, imgUrl } = req.body;

    try {
        const exist = await RestaurantsList.findOne({ name, address, imgUrl });
        if (exist) {
            return res.status(200).json({ restaurantId: exist._id, message: 'Restaurant Already exists' });
        }
        const restaurant = await RestaurantsList.create({ name, address, imgUrl });

        res.status(200).json({ restaurantId: restaurant._id, message: 'Restaurant Created Successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add restaurant' });
    }
});

foodRestaurantList.post('/admin/addFoodItems', async (req, res) => {
    const { name, description, outlet, category, price, image, restId, quantity } = req.body;

    try {
        
        const foodItem = await FoodList.create({ name, description, outlet, category, price, image, restaurant: restId, quantity });
        res.status(200).json({ foodItemId: foodItem._id, message: "Food Item Added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add food item' });
    }
});

foodRestaurantList.post('/admin/addFood', async (req, res) => {
    
    const data = req.body;
    
    try {
        const foodIds = [];
        for (const foodItem of data) {
            const newFood = await FoodList.create({
                name: foodItem.name,
                description: foodItem.description,
                outlet: foodItem.outlet,
                category: foodItem.category,
                price: foodItem.price,
                image: foodItem.image,
                restaurant: foodItem.restaurant,
                quantity: foodItem.quantity,
                reviews: foodItem.reviews
            });
            foodIds.push(newFood._id);
        }
        res.status(201).json({ success: true, foodIds });
    } catch (error) {
        console.error('Error adding food items:', error);
        res.status(500).json({ success: false, error: 'Failed to add food items' });
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
        const restaurants = await RestaurantsList.find().sort({ createdAt: -1 });
        res.status(200).json(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch restaurants' });
    }
});

foodRestaurantList.get('/getRestaurantInfo/:id',async (req,res)=>{
    const {id} = req.params;
    try {
        const restaurant = await RestaurantsList.findById(id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });}
            
            res.status(200).json({ restaurant });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to fetch food items of restaurant' });
        }
})

foodRestaurantList.get('/getAllDishOfRestaurant/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const restaurant = await RestaurantsList.findById(id);
        
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        const foodItem = []
        for(const id of restaurant.foodItems)
        {
            const item = id.toString()
            const data = await FoodList.findById(item)
           
            foodItem.push(data)
        };
       
        
        res.status(200).json({ foodItem });
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

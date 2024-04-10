import mongoose from 'mongoose'; 

const restaurant = new mongoose.Schema({
    name: { type: String, required: true },
    foodItems: {
        name: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FoodList' }]
    }
},{timestamps:true});

export const RestaurantsList = mongoose.model('RestaurantsList', restaurant);

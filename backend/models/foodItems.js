import mongoose from "mongoose";


const reviewSchema = new mongoose.Schema({
    rating: { type: Number, required: true },
    body: { type: String, required: true },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }
}, { timestamps: true }); 

const foodItemsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    reviews: [reviewSchema], 
    outlet: { type: [String], required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: [String], required: true },
    description: { type: String, required: true },
    restaurant: {
        type: mongoose.Types.ObjectId,
        ref: 'RestaurantsList'
    },
    quantity: { type: Number, required: true },
}, { timestamps: true });

export const FoodList = mongoose.model('FoodList', foodItemsSchema);

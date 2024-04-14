import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address:{type:String,required:true},
    imgUrl:{type:String,required:true},
    foodItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FoodList'
    }]
}, { timestamps: true });

export const RestaurantsList = mongoose.model('RestaurantsList', restaurantSchema);
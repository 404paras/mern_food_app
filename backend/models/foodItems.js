import mongoose from "mongoose";
const foodItemsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    reviews: [{
        rating: { type: Number},
        body: { type: String },
        date: { type: Date, default: Date.now }
    }],
    outlet: [String],
    image: {type:String, required: true},
    price:{type:Number, required: true},
    category:[String],
    description:{type:String, required:true},
    restaurant: {
        type: mongoose.Types.ObjectId,
        ref: 'RestaurantsList'
    },
    quantity:{type:Number,required:true},
}, { timestamps: true });

export const FoodList = mongoose.model('FoodList', foodItemsSchema);
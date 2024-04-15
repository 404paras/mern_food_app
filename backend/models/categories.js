import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    type: { type: String, required: true, unique: true },
    restaurants: [{
        type: mongoose.Types.ObjectId,
        ref: 'RestaurantList'
    }]
}, { timestamps: true });

export const Category = mongoose.model('Category', categorySchema);

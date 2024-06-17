import mongoose from "mongoose";

const offersSchema = new mongoose.Schema({
    couponcode: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    discount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export const Offer = mongoose.model('Offer', offersSchema);

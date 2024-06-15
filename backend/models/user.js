import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String },
    password: { type: String, required: true },
    mobile: { type: Number, unique: true, required: true },
    address: { type: String },
    orders: [{ type: mongoose.Types.ObjectId, ref: 'OrderInfo', required: true }]
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);

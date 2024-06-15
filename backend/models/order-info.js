import mongoose from 'mongoose';

const foodItemSchema = new mongoose.Schema({
  item: { type: mongoose.Types.ObjectId, ref: 'FoodList', required: true },
  count: { type: Number, required: true }
});

const orderInfoSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  foodItems: [foodItemSchema],
  transactionId: { type: String, required: true },
  payment: { type: Number, required: true },
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'], default: 'pending' }
}, { timestamps: true });

export const OrderInfo = mongoose.model('OrderInfo', orderInfoSchema);

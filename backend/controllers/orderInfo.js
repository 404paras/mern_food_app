import { Router } from 'express';
import { OrderInfo } from '../models/order-info.js';
import { User } from '../models/user.js';

const order = Router();

order.post('/order', async (req, res) => {
    const { orderId, transactionId, userId, payment, foodItems } = req.body;

    try {
const existing  = await OrderInfo.findOne({orderId});

if(existing) {

    return ;
}

        const transformedFoodItems = foodItems.map(item => ({
            item: item.id,
            count: item.count
        }));

        const newOrder = new OrderInfo({
            orderId,
            transactionId,
            userId,
            payment,
            foodItems: transformedFoodItems,
            status: "pending"
        });

        await newOrder.save();

        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $push: { orders: newOrder._id } },
            { new: true }
        );

        if (!user) {
            throw new Error('User not found');
        }

        res.status(201).json(newOrder);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: 'Failed to create order', message: error.message });
    }
});

order.get('/order/user/:userId', async (req, res) => {
    const { userId } = req.params;
    
    try {

        const orders = await OrderInfo.find({ userId });

        if (!orders) {
            return res.status(404).json({ error: 'No orders found for this user' });
        }

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders', message: error.message });
    }
});

order.get('/order/admin/all', async (req, res) => {
    try {
        const orders = await OrderInfo.find();

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders', message: error.message });
    }
});

order.put('/order/:orderId/status', async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!['Pending',  'Delivered', 'pending', 'delivered'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status value' });
    }

    try {
        const order = await OrderInfo.findOneAndUpdate(
            { _id: orderId },
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update order status', message: error.message });
    }
});

export default order;

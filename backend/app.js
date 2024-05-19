import express from 'express';
import { fileURLToPath } from 'url';
import { connectDB } from './database/connectDb.js';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './controllers/userAuth.js';
import foodRestaurantList from './controllers/foodItems.js';
import categoryRouter from './controllers/category.js';
import path from 'path';
import search from './controllers/search.js';
import Stripe from 'stripe';
import offerManagement from './controllers/offers.js';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.static(path.join(__dirname, '/frontend/build')));
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;
const YOUR_DOMAIN = process.env.YOUR_DOMAIN;

connectDB();

// Stripe Checkout Session Route
app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'YOUR_ACTUAL_PRICE_ID', // Replace with your actual Price ID from Stripe
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use('/api/v1', userRouter);
app.use('/api/v1', foodRestaurantList);
app.use('/api/v1', categoryRouter);
app.use('/api/v1', search);
app.use('/api/v1',offerManagement)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

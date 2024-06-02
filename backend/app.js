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
import offerManagement from './controllers/offers.js';
import stripePackage from 'stripe';

dotenv.config();

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.static(path.join(__dirname, '/frontend/build')));
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;
const YOUR_DOMAIN = `http://localhost:${port}`;

connectDB();

// Stripe Checkout Session Route
app.post('/create-checkout-session', async (req, res) => {
  try {
    // Create a product and price on Stripe
    const product = await stripe.products.create({
      name: 'Pure kit',
      description: 'High quality skincare product',
    });

    const price = await stripe.prices.create({
      unit_amount: 6500, // $65.00
      currency: 'inr',
      product: product.id,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: price.id, // Use the created price ID
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/success`,
    cancel_url: `${YOUR_DOMAIN}/canceled`,
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).send(`Error creating checkout session: ${error.message}`);
  }
});

app.use('/api/v1', userRouter);
app.use('/api/v1', foodRestaurantList);
app.use('/api/v1', categoryRouter);
app.use('/api/v1', search);
app.use('/api/v1', offerManagement);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

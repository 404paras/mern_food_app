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
app.post('/checout-session',async(req,res)=>{
  
  const instance = new Razorpay({ key_id: 'YOUR_KEY_ID', key_secret: 'YOUR_SECRET' })
  const amount = req.body*100
try{
  instance.orders.create({
  amount: amount,
  currency: "INR",
  receipt: "receipt#1",
  notes: {
      key1: "value3",
      key2: "value2"
  }
  })}catch{}
})


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

import express from 'express';
import { fileURLToPath } from 'url';
import { connectDB } from './database/connectDb.js';
import dotenv from 'dotenv';
import Razorpay from 'razorpay';
import cors from 'cors';
import userRouter from './controllers/userAuth.js';
import foodRestaurantList from './controllers/foodItems.js';
import categoryRouter from './controllers/category.js';
import path from 'path';
import search from './controllers/search.js';
import offerManagement from './controllers/offers.js';
import crypto from 'crypto';
import order from './controllers/orderInfo.js';
import {verifyToken} from './Authenticator.js';

dotenv.config();




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.static(path.join(__dirname, '/frontend/build')));
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;
const key_id = process.env.RAZORPAY_KEYID;
const secret_key = process.env.RAZORPAY_SECRET_KEY;

connectDB();

const razorpay = new Razorpay({
  key_id: key_id,
  key_secret: secret_key
});

app.post('/create_order', verifyToken ,async (req, res) => {
  const { amount, currency, receipt } = req.body;
  const options = {
    amount: amount , 
    currency,
    receipt,
    payment_capture: 1,
  };


  try {
    const response = await razorpay.orders.create(options);
   
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
    
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/verify_payment', verifyToken,(req, res) => {
  const { order_id, payment_id, razorpay_signature,amount } = req.body;
  const key_secret = secret_key;

  let hmac = crypto.createHmac('sha256', key_secret);
  hmac.update(order_id + "|" + payment_id);
  const generated_signature = hmac.digest('hex');

  if (generated_signature === razorpay_signature) {
    res.json({ status: 'success' , order_id:order_id , payment_id:payment_id,amount:amount});
  } else {
    res.status(400).json({ status: 'failure' });
  }
});

app.use('/api/v1', userRouter);
app.use('/api/v1', foodRestaurantList);
app.use('/api/v1', categoryRouter);
app.use('/api/v1', search);
app.use('/api/v1', offerManagement);
app.use('/api/v1',verifyToken,order)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

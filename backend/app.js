import express from 'express';
import { fileURLToPath } from 'url'; // Importing fileURLToPath function
import { connectDB } from './database/connectDb.js';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './controllers/userAuth.js';
import foodRestaurantList from './controllers/foodItems.js';
import categoryRouter from './controllers/category.js';
import path from 'path';
dotenv.config();

const __filename = fileURLToPath(import.meta.url); // Getting filename
const __dirname = path.dirname(__filename); // Getting directory name

const app = express();

app.use(express.static(path.join(__dirname, '/frontend/build')));
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 4000;

connectDB();

// Accessing environment variables

app.use('/api/v1', userRouter);
app.use('/api/v1', foodRestaurantList);
app.use('/api/v1', categoryRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

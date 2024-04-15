import express from 'express';
import {connectDB} from './database/connectDb.js'
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './controllers/userAuth.js'
import foodRestaurantList from './controllers/foodItems.js'
import categoryRouter from './controllers/category.js';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
const port =  4000;

connectDB();

app.use('/api/v1',userRouter);
app.use('/api/v1',foodRestaurantList)
app.use('/api/v1',categoryRouter)

app.listen(port,()=>{
console.log(`Listening on port ${port}`)
})

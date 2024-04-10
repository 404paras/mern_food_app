import express from 'express';
import {connectDB} from './database/connectDb.js'
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();


app.use(cors());
const port =  3000;

connectDB();

app.listen(port,()=>{
console.log(`Listening on port ${port}`)
})

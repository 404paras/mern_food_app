import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const mongoDb_uri = process.env.MONGODB_URI;


export const connectDB = async()=>{

    try {
        
await mongoose.connect(mongoDb_uri,{
    dbName:"FoodMern"
}).then(()=>{
    console.log("Database connection established")
})

    } catch (error) {
        console.log(error)
    }
}




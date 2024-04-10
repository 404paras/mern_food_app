import mongoose from 'mongoose';

const foodItems = new mongoose.Schema({
    name:{type:String , required:true},
    review:{rating:Number , body:String , date:Date},
    outlet: [String],
    image:String,
restaurant:{
type: mongoose.Types.ObjectId,
    ref: 'RestaurantsList'
}
},{timestamps:true})


export const FoodList = mongoose.model('FoodList',foodItems);
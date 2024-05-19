import mongoose from "mongoose";

const offers = new mongoose.Schema({
couponcode:{type:String, required:true,unique:true},
discount:{type:Number,required:true}

},{timestamps:true})

export const Offer = mongoose.model('Offer',offers)
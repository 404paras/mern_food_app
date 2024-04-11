import mongoose from 'mongoose';


const user = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String,required:true,unique:true},
    role:{type:String},
    password:{type:String,required:true}


},{timestamps:true})

export const User = mongoose.model('User',user);
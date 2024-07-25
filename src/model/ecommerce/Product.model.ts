import mongoose from "mongoose";
import userModel from "../User.Model.js";

const  ProductSchema = new mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    ratings:Array,
    images:Array,
    categories:String,
    numOfReview:Number,
    reviews:[{
        user:{
 type: mongoose.Schema.ObjectId,
 ref:userModel
        },
        name:String,
        rating:Number,
        review:String
    }],
    user:{
        type: mongoose.Schema.ObjectId,
        ref:userModel,
    },
    createdAt:{type:Date, default:Date.now()}

})

const ProductModel = mongoose.model('Product', ProductSchema) ;
export default  ProductModel;
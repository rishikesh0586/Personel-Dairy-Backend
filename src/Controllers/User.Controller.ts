import userModel from "../model/User.Model.js";
import { Request,Response } from "express";

/* it has 4 controller register updateUser deleteUser readAllUser */
export const register = async(req:Request,res:Response)=>{
const {name,email,password} = req.body;

//check server side validation  if name email and password are not null
//if user email exists

const user=await userModel.find({email});
if(!user){
    return res.status(409).json({message:"email already exists",});
    //throw new Error("error hai")
}

await userModel.create({name,email,password});


    res.json({message:"user created"});
}

export const  readAllUser = async (req:Request, res:Response) => {
const allUsers = await userModel.find({});
//check for null users
res.status(200).json({message:"success",allUsers});
}

export const updateUser =async (req:Request, res:Response) => {
    const _id = req.params.id;
    console.log(_id);
//check for null values 
let user = await userModel.findById(_id);
console.log(user);
if(!user) {
    return res.status(404).json({message:"user not found"});
}
  user=await userModel.findByIdAndUpdate(_id, req.body,{  new: true,
    runValidators: true,
    useFindAndModify: false,});
res.status(200).json({message:"successfully updated user",user});
}

export   const deleteUser = async (req:Request, res:Response) => {
const user = await userModel.findById(req.params.id);
if(!user) {
    res.status(404).json({message:"user not found"});
}
await user?.deleteOne();
res.status(200).json({message:"successfully deleted",user});
}

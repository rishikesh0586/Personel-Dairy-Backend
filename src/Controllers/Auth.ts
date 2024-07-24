import userModel from "../model/User.Model.js";
import { Request,Response } from "express";
import {setCookies} from "../utils/setCookie.js"
interface IuserLogin {
  email: string;
  password: string;
}
/* here login function start*/
export const login =async(req:Request,res:Response) => {
const {email,password} = req.body ;
//as IuserLogin;
const user = await userModel.findOne({email: email});

if (!user) {
return res.status(404).json({message:"not found"});

}
//const userPassword = user as { password: string };
if (user?.password !== password) {
return res.status(401).json({message:"password not match "});
}
//res.status(200).json({message:"success"})
setCookies(user,200,res);
};

/* here login function end*/
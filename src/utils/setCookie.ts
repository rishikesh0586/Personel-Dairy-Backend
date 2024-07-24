import { Response } from "express"
import jwt from "jsonwebtoken";
export const setCookies = (user:any,statusCode:number,res: Response)=>{
const token = getJWTtoken(user);

res.status(statusCode).cookie("token",token,{
    expires: new Date(Date.now()+5*24*60*60*1000
    //day *hours *minutes *seconds*milliseconds
    ),
    httpOnly: true
  }).json({
    message:"login successful",
    user: user,
    token: token
  })
}

const getJWTtoken = (user:any)=>{
    const JWT_SECRET="abcdrfgh";
    const JWT_EXPIRE="5d";

    return jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRE,
      });
}
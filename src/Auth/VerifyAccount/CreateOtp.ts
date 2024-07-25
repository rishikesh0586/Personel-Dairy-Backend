import jwt from "jsonwebtoken";

export const CreateOtp=(user:any)=>{
    
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
const OtpExpire ="5m";
const OtpSecret="absdiff";
    const token = jwt.sign({user, otp,},OtpSecret,{expiresIn:OtpExpire});

    return {token,otp};
}
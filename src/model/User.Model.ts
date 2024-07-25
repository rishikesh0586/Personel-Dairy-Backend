import mongoose from "mongoose";

interface Iuser extends Document{
    name: string,
    email: string,
    password: string
}

const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    isVarified:{type:Boolean, default:false}

});

const userModel = mongoose.model<Iuser>('user', UserSchema) ;
export default  userModel;
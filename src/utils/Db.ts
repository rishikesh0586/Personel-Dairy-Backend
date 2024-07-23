import mongoose from "mongoose";


const connectDB = async(uri: string) => {

    await mongoose.connect(uri).then(() => {
        console.log('database is connected');
    }).catch(err => console.log("error in database"+err));
};

export default connectDB;
import mongoose from "mongoose";

//Declare the Schema for the user
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password: {
        type:String
    },
    emailVerified:{
        type: Date,
    },
    image: {
        type: String
    },
    favoriteIds: [{ type: mongoose.Schema.Types.ObjectId, ref:"Listing"}],
    refreshToken: String,


}, {timestamps: true})

const userModel = mongoose.model('User', userSchema);
export default userModel
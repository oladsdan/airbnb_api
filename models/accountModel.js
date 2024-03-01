import mongoose from "mongoose";


// Declare the Schema of the Mongo model
const accountSchema = new mongoose.Schema({
    type: String,
    provider:{
        type: String,
        unique: true
    },
    providerAccountId:{
        type:String,
        unique: true
    },
    refresh_token: String,
    access_token: String,
    expires_at: Number,
    token_type: String,
    scope: String,
    id_token: String,
    session_state: String,
    userId:  { type: mongoose.Schema.Types.ObjectId, ref:"User" },
    
});

const accountModel = mongoose.model('Account', accountSchema);
export default accountModel
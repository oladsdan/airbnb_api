import mongoose from "mongoose";

// Declare the Schema of the Mongo model
const listingSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageSrc: String,
    category: String,
    roomCount: Number,
    bathroomCount: Number,
    guestCount: Number,
    locationValue:String,
    userId:  { type: mongoose.Schema.Types.ObjectId, ref:"User" },
    price: Number
    
}, {timestamps: true});

//Export the model
const listingModel = mongoose.model('Listing', listingSchema);
export default listingModel
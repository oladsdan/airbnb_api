import mongoose from "mongoose";

// Declare the Schema of the Mongo model
const reservationSchema = new mongoose.Schema({
   userId:  { type: mongoose.Schema.Types.ObjectId, ref:"User" },
   listingId:  { type: mongoose.Schema.Types.ObjectId, ref:"Listing" },
   owner: { type: mongoose.Schema.Types.ObjectId, ref:"User" },
   startDate: Date,
   endDate: Date,
   totalPrice: Number,

}, {timestamps: true});

//Export the model
const reservationModel = mongoose.model('Reservations', reservationSchema);
export default reservationModel
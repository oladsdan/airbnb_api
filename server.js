import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoutes from './routes/authRoutes.js';
import listingRoutes from './routes/listingRoutes.js';
import userRoutes from './routes/userRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js'
import cors from 'cors';
import corsOptions from './config/corsOptions.js'
import credentials from "./middlewares/credentials.js";

dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express()


//middlewares for json
//built in middleware to enable urlencoded data
app.use(credentials)
app.use(cors(corsOptions));

app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false}))
app.use(cookieParser());

//built-in middleware for json
app.use(express.json())

//the routes for use
app.use('/api', authRoutes);
app.use('/api-listing', listingRoutes);
app.use('/users', userRoutes);
app.use('/api-reservations', reservationRoutes);

//we set the connection
mongoose.connect(process.env.MONGO_Url_Connect).then(() => {
    app.listen(PORT, () => console.log(`server running on Port ${PORT} and connected to mongoCluster`))
}).catch((error) => console.log(`${error} try again later`))

mongoose.connection.on("disconnected", () => {
    console.log("mongo disconnected")
})

mongoose.connection.on("connected", () => {
    console.log("mongo connected")
})
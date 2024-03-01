import reservationModel from "../models/reservationsModel.js";
import validateDBid from "../utils/validateDBid.js";

export const CreateReservation = async (req, res) => {
    const {_id} = req.user;
    validateDBid(_id); 
    const data = req.body
    const {startDate, endDate, listingId} = req.body;
    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate);

    try {
        if(!listingId || !startDate || !endDate) return res.satus(401).json("check the above some values missing")
        const reservations = new reservationModel({...data, startDate:newStartDate, endDate:newEndDate, userId:_id})
        const savedReservations = await reservations.save()
        return res.status(201).json(savedReservations);
        
    } catch (error) {
        res.json(error)
        
    }

}

export const getReservationByListingId =  async (req, res) => {
    const {id} = req.params;
    validateDBid(id);
    const listingId = id.toString()

    try{
        if(!id) return res.sendStatus(404);
        const savedReservation = await reservationModel.find({listingId});
        if(!savedReservation) return res.json("");
        return res.status(200).json(savedReservation)

    }catch(error){
        res.status(500).json(error)
    }
}

export const getReservationByUserId =  async (req, res) => {
    const {_id} = req.user;
    // validateDBid(_id);
    const userId = _id.toString()


    try{
        if(!userId) return res.sendStatus(404);
        const savedReservation = await reservationModel.find({userId:userId}).exec();
        if(!savedReservation) return res.json("");
        return res.status(200).json(savedReservation)

    }catch(error){
        res.status(500).json(error)
    }
}

export const getReservationsByOwner = async (req, res) => {
    const {_id:owner} = req.user;

    try{
        if(!owner) return res.sendStatus(404);
        const reservationsMade = await reservationModel.find({owner:owner}).exec();
        if(!reservationsMade) return res.json("");
        return res.status(200).json(reservationsMade)
    }catch(error){
        res.status(500).json(error)
    }

}

export const deleteReservationById = async(req, res) => {
    const {_id:userId} = req.user;
    const {id} = req.params;
    validateDBid(id);

    try {
        //we find the id in the database to delete
        const reservations = await reservationModel.findById(id).exec();
        if(!reservations) return res.status(404).json("Not Found")
        if(reservations?.userId.toString() === userId.toString()){
            const delReservation = await reservationModel.findByIdAndDelete(id).exec();
            if(!delReservation) return res.sendStatus(401);
            return res.sendStatus(201)
        }
        if(reservations?.owner.toString() === userId.toString()){
            const delReservation = await reservationModel.findByIdAndDelete(id).exec();
            if(!delReservation) return res.sendStatus(401);
            return res.sendStatus(201) 
        }
        return res.sendStatus(403)



        
    } catch (error) {
        res.status(500).json(error)
    }
}
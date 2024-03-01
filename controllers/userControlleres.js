import mongoose from "mongoose";
import listingModel from "../models/listingModel.js";
import userModel from "../models/userModels.js";
import validateDBid from "../utils/validateDBid.js"


export const likeListing = async (req, res) => {
    
    // get the current user
    const {_id:userId} = req.user;
    // we validate the id
    validateDBid(userId);

    // then we get the listing id from params
    const {id:listingId} = req.params;
    validateDBid(listingId);

    // const {id:listingId} = req.params;
    // const listingIds = mongoose.Types.ObjectId(listingId)

    try {
        // const UsersData = await userModel.findByIdAndUpdate(userId)
        const usersListing = await userModel.findOne({favoriteIds: listingId}).exec();
        if(!usersListing){
            const usersData = await userModel.findByIdAndUpdate(userId,  {
                $push: {favoriteIds: listingId}
            }, {new: true})
            return res.sendStatus(201)
        }
        const usersDataAddFav = await userModel.findByIdAndUpdate(userId,  {
            $pull: {favoriteIds: listingId}
        }, {new: true})

        return res.sendStatus(201)
        
    } catch (error) {
        res.sendStatus(500)
        
    }

}

export const getUserbyId = async (req, res) =>{
    const {userId} = req.params;
    validateDBid(userId);

    try {
        // we find the user in database
        const userData = await userModel.findById(userId).exec()
        if(userData){
            const {name} = userData;
           return res.status(200).json(name)
        }

        return res.sendStatus(404)

    
        


    } catch (error) {
        console.error(error)
        
    }
}

export const getFavoriteListings =  async (req, res) => {
    const{_id} = req.user;
    // if(!userId) return res.sendStatus(404);

    try {
        //first we find the user from the database
        const usersData = await userModel.findById(_id).exec();
        // const favoriteIds = usersData?.favoriteIds.toString();


        if(usersData){
            const {favoriteIds} = usersData;
            
           
            const listingResults =[]
            await Promise.all(
                favoriteIds.map(async(favorite) => {

                    const listingData = await listingModel.findById(favorite).exec();
                    listingResults.push(listingData)

                })
            )
            return res.status(200).json(listingResults)


        }
        return res.status(401).json("No user found")
        
    } catch (error) {
        res.sendStatus(500)
        
    }
    
}

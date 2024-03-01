import listingModel from '../models/listingModel.js';
import validateDBid from '../utils/validateDBid.js';


export const CreateListing = async (req, res) => {

    const createdListing = req.body;
    const {location } = req.body;
    // const {
    const {_id} = req.user;
    validateDBid(_id);

    try {

        const newListing = new listingModel({...createdListing, userId:_id, locationValue:location.value})
        const savedListing = await newListing.save();
        return res.status(201).json(savedListing)
        
    } catch (error) {
        res.json(error)
        
    }


}

export const GetAllListing = async (req, res) => {
    
    try {
        const queryObj = {...req.query};
        const excludeFields = ["page", "sort", "limit", "fields"];
        excludeFields.forEach((el) => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        

        // wo we find the query
        let query = await listingModel.find(JSON.parse(queryStr))
        
        //Sorting
        // if(req.query?.sort){
        //     const sortBy = req.query.sort.split(",").join(" ");
        //     query = query.sort(sortBy);
        // } else {
        //     query = query.sort("createdAt")
        // }
        
        // //limiting the fields
        // if(req.query.fields){
        //     const fields = req.query.fields.split(",").join(" ");
        //     query = query.select(fields);
        // }else{
        //     query = query.select("-__v");
        // }


        // //pagination
        // const page = req.query.page;
        // const limit = req.query.limit;
        // const skip = (page-1) * limit;
        // query = query.skip(skip).limit(limit)

        // if (req.query.page){
        //     const listingCount = await listingModel.countDocuments();
        //     if(skip >= productCount) throw new Error("This Page does not exist")
        // }

        const getAllListing = query



        // const allListing = await listingModel.find().sort({createdAt: "desc"})
        return res.json(getAllListing)
    } catch (error) {
        res.sendStatus(500);

        
    }
}

export const GetListingbyId = async(req, res) => {
    const {id} = req.params;
    validateDBid(id)

    try {
        const listingData = await listingModel.findById(id).exec();
        if(!listingData) return res.sendStatus(404);
        return res.json(listingData)


    } catch(error) {
        res.sendStatus(500)
    }

}

export const GetListingsByUsers = async(req, res) => {
    const {_id:userId} = req.user;
    validateDBid(userId)

    try {
        const listingsByUser = await listingModel.find({userId: userId}).sort({createdAt: "desc"}).exec();
        if(!listingsByUser) return res.status(404).json("No listings created")
        return res.json(listingsByUser)
        
    } catch (error) {
        res.sendStatus(500)
    }

}

export const deleteListingByUsers = async(req, res) => {
    const {_id:userId} = req.user;
    validateDBid(userId)

    const{id:listingId} = req.params;
    validateDBid(listingId);
    
    try {
        //first we find if the users is the owner of the property to delete
        const usersProperty = await listingModel.findById(listingId).exec()
        if(!usersProperty) return res.status(404).json("Not Found")
        if(usersProperty?.userId.toString() === userId.toString()){
            const delListing = await listingModel.findByIdAndDelete(listingId)
            if(!delListing) return res.sendStatus(401);
            return res.sendStatus(201)

        }
        return res.sendStatus(403)

    } catch (error) {
        res.status(500).json(error)
    }




}
import mongoose from "mongoose";

const validateDBid = (id) => {
    // this is used to validate the db
    const isvalidId = mongoose.Types.ObjectId.isValid(id);
    if (!isvalidId)
        throw new Error("This is not valid or not found")
}

export default validateDBid
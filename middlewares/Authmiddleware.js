import userModel from "../models/userModels.js";
import jwt from "jsonwebtoken";

const authMiddleware = async(req, res, next) => {
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]
        try {
            if(token){
                const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
                const user = await userModel.findById(decoded?.userid)
               
                
                req.user = user;
                next();
            }

        }catch(error) {
            res.status(401).json("Not Authorized token expired, Please Login again")

        }
    }else {
        res.status(403).json("Forbidden")
    }
}

export default authMiddleware
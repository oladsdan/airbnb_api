import allowedOrigins from "./allowedOrigins.js";


//we create a function
const corsOptions = {
    origin: (origin, callback) =>{
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        } else {
            callback(new Error('Not allowed by Cors'))
        }
    }
}

export default corsOptions
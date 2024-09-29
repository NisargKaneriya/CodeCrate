// Importing required modules
import jwt from "jsonwebtoken";

// Importing custom middlewares
import { errorHandler } from "./errorHandler.js";

export const verifyUser = async(req, res, next) => {
    // Grab the token from browser
    const token = req.cookies.token;
    if(!token){
        return next(errorHandler(401, "Unauthorized."));
    }

    // verifying the token
    jwt.verify(token, process.env.JWT_SECRET, (err, userData) => {
        if(err){
            return next(errorHandler(401, "Unauthorized."));
        }
         req.user = userData;
         next();
    });
}
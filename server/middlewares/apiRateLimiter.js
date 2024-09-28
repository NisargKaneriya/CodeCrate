// Importing required modules
import rateLimit from "express-rate-limit";
import { errorHandler } from "./errorHandler.js";

// Creating a function to limit the API requests
export const requestLimiter = rateLimit({
	windowMs: 60 * 1000,
    limit: 5,
    standardHeaders: "draft-7",
    legacyHeaders: "false",
    handler: (req, res, next) => {
        next(errorHandler(429, "Too many requests. Try again later."));
    } 
});
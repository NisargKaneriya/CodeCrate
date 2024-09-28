// Importing required modules
import express from "express";

// Importing the custom controllers
import { loginUser, logoutUser, singupUser } from "../controllers/authController.js";
import { renderLoginPage, renderSignupPage } from "../controllers/renderController.js";

// /Importing custom middlewares
import { requestLimiter } from "../middlewares/apiRateLimiter.js";

// Creating a router
const router = express.Router();

// Defining the routes
router.get("/login", renderLoginPage);
router.get("/signup", renderSignupPage);

router.post("/login", requestLimiter, loginUser);
router.post("/signup", requestLimiter, singupUser);
router.post("/logout", requestLimiter, logoutUser);

// Exporting the router
export default router;
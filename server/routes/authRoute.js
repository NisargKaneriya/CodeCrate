// Importing required modules
import express from "express";

// Importing the custom controllers
import { loginUser, logoutUser, singupUser } from "../controllers/authController.js";
import { renderLoginPage, renderSignupPage } from "../controllers/authController.js";

// Creating a router
const router = express.Router();

// Defining the routes
router.get("/login", renderLoginPage);
router.post("/login", loginUser);
router.get("/signup", renderSignupPage);
router.post("/signup", singupUser);
router.post("/logout", logoutUser);

// Exporting the router
export default router;
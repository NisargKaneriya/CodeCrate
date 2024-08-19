// Importing required modules
import express from 'express';

// Importing the custom controllers
import { loginUser, logoutUser, singupUser } from '../controllers/authController.js';

// Creating a router
const router = express.Router();

// Defining the routes
router.get("/login", loginUser);
router.get("/signup", singupUser);
router.get("/logout", logoutUser);

// Exporting the router
export default router;
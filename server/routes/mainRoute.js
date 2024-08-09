// Importing required modules
import express from 'express';

// Importing the custom controllers
import { indexController } from '../controllers/mainController.js';

// Creating a router
const router = express.Router();

// Defining the routes
router.get('/', indexController);


// Exporting the router
export default router;
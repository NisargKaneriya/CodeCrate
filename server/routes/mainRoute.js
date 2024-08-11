// Importing required modules
import express from 'express';

// Importing the custom controllers
import { indexController } from '../controllers/mainController.js';

// Creating a router
const router = express.Router();

// Defining the routes
router.get('/', indexController);

// Default route when the above route don't matches
router.get('*', (req, res) => {
    res.status(404).send("Error : Page Not found.")
});


// Exporting the router
export default router;
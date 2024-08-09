// Importing required modules
import express from "express";
import expressLayouts from "express-ejs-layouts";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

// Importing the custom routes
import mainRoute from "./server/routes/mainRoute.js";

// Configuring the env variables
dotenv.config({ path: ".env" });

// Getting the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Creating an express app
const app = express();

// Setting up the express middlewares
app.use(express.json());                                // Middleware to parse the JSON data
app.use(express.urlencoded({ extended: true }));        // Middleware to parse URL-encoded bodies
app.use(cookieParser());                                // Middleware to parse the cookies

// Setting up the view engine to EJS
app.use(expressLayouts);
app.set("layout", "layouts/indexLayout");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "client/views"));

// Setting up the static content files
app.use(express.static(path.join(__dirname, "client/public")));
// Populating and serving static files globally
app.use("/stylesheets", express.static(path.join(__dirname, "client/public/stylesheets")));
app.use("/scripts", express.static(path.join(__dirname, "client/public/scripts")));
app.use("/img", express.static(path.join(__dirname, "client/public/img")));

// Setting up the custom routes
app.use("/", mainRoute);

// Grabbing the port for the server binding
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is up & running at http://localhost:${PORT}`);
});

// Express Global Error Handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error...';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
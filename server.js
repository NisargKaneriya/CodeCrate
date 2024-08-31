// Importing required modules
import express from "express";
import expressLayouts from "express-ejs-layouts";
import session, { Cookie } from "express-session";
import flash from "connect-flash";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import dbConnect from "./server/database/dbConnection.js";

// Importing the custom routes
import mainRoute from "./server/routes/mainRoute.js";
import authRoute from "./server/routes/authRoute.js";

// Configuring the env variables
dotenv.config({ path: ".env" });

// Getting the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Creating an express app
const app = express();

// Setting up the express middlewares
app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded bodies
app.use(express.json()); // Middleware to parse the JSON data
app.use(cookieParser(process.env.COOKIE_SECRET)); // Middleware to parse the cookies
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 60000 * 60 * 24 * 1		// 1 day
	}
}));

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
app.use("/api/auth", authRoute);
app.use("/", mainRoute);

// Grabbing the port for the server binding
const PORT = process.env.PORT || 4000;

// Starting the app server
dbConnect().then(() => {
	console.log("Server connected to DB..");
	app.listen(PORT, () => {
		console.log(`Server is up & running at http://localhost:${PORT}`);
	});
});

// Express Global Error Handler
app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || "Internal Server Error...";
	res.status(statusCode).json({
		success: false,
		statusCode,
		message,
	});
});

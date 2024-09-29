// Importing required modules
import express from "express";
import session from "express-session";
import expressLayouts from "express-ejs-layouts";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Importing custom DB connection logic
import dbConnect from "./server/database/dbConnection.js";

// Importing the custom routes
import mainRoute from "./server/routes/mainRoute.js";
import authRoute from "./server/routes/authRoute.js";

// Importing custom utilities
import {printAscii} from "./server/utils/printAsciiArt.js";

// Configuring the env variables
dotenv.config({ path: ".env" });

// Getting the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Creating an express app
const app = express();

// Setting up the express middlewares
app.use(express.json()); 							// Middleware to parse the JSON data
app.use(express.urlencoded({ extended: false })); 	// Middleware to parse URL-encoded bodies
app.use(morgan("dev"));								// Middleware to log the requests
app.use(cookieParser()); 							// Middleware to parse the cookies
app.use(session({									// Middleware to create the sessions
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: process.env.NODE_ENV === "development" ? false : true,// only accessible to secured requests
		httpOnly: true,								// only accessible to standardized http requests
		maxAge: 1000 * 60 * 60 * 24 * 1				// will expire in 1 day
	}
}));

// Setting up the view engine to EJS templating
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

// Starting the app server & connecting to DB
printAscii();
dbConnect().then(() => {
	console.log("========================================================================");
	console.log("🍻 Server connected to DB");
	app.listen(PORT, () => {
		console.log(`⚡ Server up & running at http://localhost:${PORT}`);
		console.log("========================================================================\n");
	});
});

// Express Global Error Handler to handle the errors universaly
app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || "Internal Server Error...";
	const description = err.description || "Please try again later.";
	res.status(statusCode).json({
		success: false,
		statusCode,
		message,
		description,
	});
});

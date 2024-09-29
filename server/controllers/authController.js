// Importing Required Modules
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Importing custom middlewares
import { errorHandler } from "../middlewares/errorHandler.js";

// Importing data models
import User from "../models/userModel.js";

// Controller function to handle the Signup user functionality
export const singupUser = async (req, res, next) => {
	try {
		// destructuring the incoming data from client body
		const { fullName, email, password, cnfmPassword } = req.body;
		
		// Check whether all fields are populated or not
		if (!fullName || !email || !password || !cnfmPassword) {
			return next(errorHandler(400, "All inputs are required", "Provide all values before submitting."));
		}
		
		// Check if the user is already existing
		const userExists = await User.findOne({ email });
		if (userExists) {
			return next(errorHandler(400, "User Already exists.", "Please try with different email."));
		}

		// Check whether the password is of desired length or not
		const isPassLength = password.length >= 8 ? true : false;
		if (!isPassLength) {
			return next(errorHandler(400, "Weak password", "Password must be longer than 8 characters."));
		}

		// Check whether the password and Confirm-password do match or not
		const isPassMatch = password === cnfmPassword ? true : false;
		if (!isPassMatch) {
			return next(errorHandler(400, "Password mismatch", "Both passwords must be same."));
		}

		// validate the user full fullName
		const fullNameRegex = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
		if (!fullNameRegex.test(fullName)) {
			return next(errorHandler(400, "Invalid full name", "Only alphabets are allowed."));
		}
		
		// validate the user email
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if (!emailRegex.test(email)) {
			return next(errorHandler(400, "Invalid Email", "Enter a valid email address."));
		}

		// validate the user password
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
		if (!passwordRegex.test(password)) {
			return next(errorHandler(400, "Weak password", "Include a uppercase, lowercase, special & aplhanumeric characters."));
		}
		
		// Protecting the sensitive credentials
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Create a new user with obtained credentials
		const newUser = new User({
			fullName,
			email,
			password: hashedPassword,
		});

		// save new user to database
		await newUser.save();

		res.status(201).json({ message: "User created successfully." });
	} catch (error) {
		next(error);
	}
};


// Controller function to handle the Login user functionality
export const loginUser = async (req, res, next) => {
	try {
		// destructuring the incoming data from client body
		const { email, password } = req.body;

		// Check whether all fields are populated or not
		if (!email || !password) {
			return next(errorHandler(400, "All inputs are required", "Provide all values before submitting."));
		}

		// validate the user email
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		if (!emailRegex.test(email)) {
			return next(errorHandler(400, "Invalid Email", "Enter a valid email address."));
		}

		// Check for the record existence
		const validUser = await User.findOne({ email });
		if (!validUser) {
			return next(errorHandler(400, "Invalid email or password.", "Please provide correct credentials."));
		}

		// Check for credentials
		const validPassword = bcrypt.compareSync(password, validUser.password);
		if (!validPassword) {
			return next(errorHandler(400, "Invalid Email or password.", "Please provide correct credentials."));
		}

		// Create a token
		const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
		// Exlcude security credentials from response
		const { password: passwd, ...rest } = validUser._doc;
		res.status(200).cookie("token", token, { httpOnly: true }).json(rest);
	} catch (error) {
		next(error);
	}
};

// Creating a logout user Controller Function
export const logoutUser = async (req, res, next) => {
	try {
		res.clearCookie("token").status(200).json({"message": "Logout successful."});
	} catch (error) {
		next(error);
	}
};
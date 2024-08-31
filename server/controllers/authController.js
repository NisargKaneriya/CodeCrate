// Importing Required Modules
import User from "../models/userModel.js";

// Controller to render the Login page
export const renderLoginPage = async (req, res, next) => {
	try {
		res.render("login", {
			layout: "layouts/loginLayout",
		});
	} catch (error) {
		next(error);
	}
};

// Creating a login user Controller Function
export const loginUser = async (req, res, next) => {
	try {
		res.render("login", {
			layout: "layouts/loginLayout",
		});
	} catch (error) {
		next(error);
	}
};

// Controller to render the Signup page
export const renderSignupPage = async (req, res, next) => {
	try {
		res.render("signup", {
			layout: "layouts/signupLayout",
		});
	} catch (error) {
		next(error);
	}
};

// Creating a signup user Controller Function
export const singupUser = async (req, res, next) => {
	try {
		const { fullName, email, password, cnfmPassword } = req.body;
		// Temporary changes=============
		const newUser = new User({
			fullName,
			email,
			password,
		});
		await newUser.save();
		res.redirect("/login");
		// ==========================
	} catch (error) {
		next(error);
	}
};

// Creating a logout user Controller Function
export const logoutUser = async (req, res, next) => {
	try {
	} catch (error) {
		next(error);
	}
};

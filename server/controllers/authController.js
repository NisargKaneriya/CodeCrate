// Importing Required Modules

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

// Creating a signup user Controller Function
export const singupUser = async (req, res, next) => {
	try {
		res.render("signup", {
			layout: "layouts/signupLayout",
		});
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

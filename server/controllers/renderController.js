// Controller to render the Index page
export const renderIndexPage = async (req, res, next) => {
	try {
		res.render("index", {
			layout: "layouts/indexLayout",
		});
	} catch (error) {
		next(error);
	}
};

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

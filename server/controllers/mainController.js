// Importing Required Modules

// Creating a indexController Controller Function
export const indexController = async (req, res, next) => {
	try {
		res.render("index", {
			layout: "layouts/indexLayout",
		});
	} catch (error) {
		next(error);
	}
};

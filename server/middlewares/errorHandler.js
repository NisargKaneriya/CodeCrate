// Exporting our Error Handler function
export const errorHandler = (statusCode, message, description) => {
	const error = new Error();
	error.statusCode = statusCode;
	error.message = message;
	error.description = description;
	return error;
};

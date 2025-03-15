import Category from "../models/Category.js";
import ExtendedError from "../utils/ExtendedError.js";

const idCheck = async (req, res, next) => {
	try {
		const {
			params: { id },
		} = req;

		// Check if ID is a number
		const regex = /^\d+$/; //regex to check if id is a number only of digits (0-9)

		console.log("Received ID:", id); // Debugging

		if (!regex.test(id)) {
			throw new ExtendedError("Invalid category ID format", 400);
		}

		const category = await Category.findByPk(id);
		if (!category) {
			throw new ExtendedError("Category not found", 404);
		}

		req.category = category; //save found categoryItem to req object

		next(); //if no error occurs, go to next middleware/controller
	} catch (err) {
		next(
			new ExtendedError(
				err.message || "An error occurred",
				err.statusCode || 500
			)
		); //create error object & go to Error handler
	}
};

export default idCheck;

import Category from "../models/Category.js";
import ExtendedError from "../utils/ExtendedError.js";

const idCheck = async (req, res, next) => {
	try {
		const {
			params: { id },
		} = req;
		const category = await Category.findByPk(id);
		if (!category) {
			throw new ExtendedError("Category not found", 404);
		}
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

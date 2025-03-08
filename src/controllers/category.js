//import model
import Category from "../models/Category.js";
//import Error Class
import ExtendedError from "../utils/ExtendedError.js";

/*const categoryBody = async (req, res, next) => {
	//destructure req body
	const {
		body: {  name }, //destructure body
	} = req;
	try {
		const value = await categorySchema.validateAsync({ //within async use validateAsync method
			//validate body
			name
		});
		next(); //if no error occurs, go to next middleware/controller
	} catch (err) {
		next(new ErrorResponse(400, err.message)); //create error object & go to Error handler
};
*/

export const getAllCategories = async (req, res) => {
	try {
		const categories = await Category.findAll();
		res.json(categories);
	} catch (err) {
		// Pass the error to the next middleware (error handler)
		next(new ExtendedError(err.message, 500)); //general server error
	}
};

export const createCategory = async (req, res) => {
	try {
		const category = await Category.create(req.body);
		res.json(category);
	} catch (err) {
		// Pass the error to the next middleware (error handler)
		next(new ExtendedError(err.message, 500));
	} //general server error}
};

export const getCategory = async (req, res) => {
	try {
		const {
			params: { id },
		} = req;
		const category = await Category.findByPk(id);
		if (!id) {
			next(new ExtendedError(404, err.message));
		}
		res.json(category);
	} catch (err) {
		// Pass the error to the next middleware (error handler)
		next(new ExtendedError(err.message, 500));
	} //general server error}
};

export const updateCategory = async (req, res) => {
	try {
		const {
			params: { id },
		} = req;
		const category = await Category.findByPk(id);
		if (!id) {
			next(new ExtendedError(404, err.message));
		}
		await category.update(req.body);
		res.json(user);
	} catch (err) {
		// Pass the error to the next middleware (error handler)
		next(new ExtendedError(err.message, 500));
	} //general server error}
};

export const deleteCategory = async (req, res) => {
	try {
		const {
			params: { id },
		} = req;
		const category = await Category.findByPk(id);
		if (!id) {
			next(new ExtendedError(404, err.message));
		}
		await category.destroy();
		res.json({ message: "Category deleted successfully" });
	} catch (err) {
		// Pass the error to the next middleware (error handler)
		next(new ExtendedError(err.message, 500));
	} //general server error}
};

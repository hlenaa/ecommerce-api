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
	const categories = await Category.findAll();
	res.json(categories);
};

export const createCategory = async (req, res) => {
	const category = await Category.create(req.body);
	res.json(category);
};

export const getCategory = async (req, res) => {
	const category = req.category;
	res.json(category);
};

export const updateCategory = async (req, res) => {
	const category = req.category;
	await category.update(req.body);
	res.json(category);
};

export const deleteCategory = async (req, res) => {
	const category = req.category;
	await category.destroy();
	res.json({ message: "Category deleted successfully" });
};

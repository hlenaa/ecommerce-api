import Category from "../models/Category.js";
import ExtendedError from "../utils/ExtendedError.js";

const categoryExistsChecker = async (req, res, next) => {
	try {
		const { categoryId } = req.body; //get the category Id foreign key
		const category = await Category.findByPk(categoryId); //check in Category table if the mentioned category exists

		if (!category) throw new ExtendedError(404, "Category does not exist"); //non existent

		req.category = category; //pass catgory on tho the next middleware/controller
		next();
	} catch (err) {
		next(
			err instanceof ExtendedError ? err : new ExtendedError(400, err.message)
		);
	}
};

export default categoryExistsChecker;

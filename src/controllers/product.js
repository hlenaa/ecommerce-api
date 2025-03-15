import Product from "../models/Product.js";
import ExtendedError from "../utils/ExtendedError.js";

export const getAllProducts = async (req, res, next) => {
	try {
		const products = await Product.findAll();
		res.json(products);
	} catch (error) {
		next(error);
	}
};

export const getProductById = async (req, res, next) => {
	try {
		const product = await Product.findByPk(req.params.id);
		if (!product) {
			throw new ExtendedError(404, "Product not found");
		}

		res.json(product);
	} catch (error) {
		next(error);
	}
};

export const createProduct = async (req, res, next) => {
	try {
		const { name, price, description, categoryId } = req.body;

    //Products cannot be created if category doesn’t exist 

		const product = await Product.create({
			name,
			price,
			description,
			categoryId,
		});

		res.status(201).json({ message: "Product created successfully", product });
	} catch (error) {
		next(new ExtendedError(400, error.message));
	}
};

export const updateProduct = async (req, res, next) => {
	try {
		const { name, price, description, categoryId } = req.body;
		const product = await Product.findByPk(req.params.id);

		if (!product) {
			throw new ExtendedError(404, "Product not found");
		}

		await product.update({ name, price, description, categoryId });

		res.json({ message: "Product updated successfully", product });
	} catch (error) {
		next(error);
	}
};

export const deleteProduct = async (req, res, next) => {
	try {
		const product = await Product.findByPk(req.params.id);

		if (!product) {
			throw new ExtendedError(404, "Product not found");
		}

		await product.destroy();

		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		next(error);
	}
};

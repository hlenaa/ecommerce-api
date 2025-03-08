import Product from "../models/Product.js";


export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


export const createProduct = async (req, res) => {
  try {
    const { name, price, description, categoryId } = req.body;
    const product = await Product.create({ name, price, description, categoryId });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
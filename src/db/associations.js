import sequelize from "./index.js";
import Category from "../models/Category.js";

//Category associations (One to Many)
Category.hasMany(Product, { foreignKey: "categoryId" }); //category has many products
Product.belongsTo(Category, { foreignKey: "categoryId" }); // product belongs to one category

import sequelize from "./index.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";

//Category associations (One to Many)
Category.hasMany(Product, { foreignKey: "categoryId" }); //category has many products
Product.belongsTo(Category, { foreignKey: "categoryId" }); // product belongs to one category

Order.belongsToMany(Product, { through: OrderItem, foreignKey: 'orderId' });
Product.belongsToMany(Order, { through: OrderItem, foreignKey: 'productId' });

sequelize.sync(); //create the tables if they do not exist
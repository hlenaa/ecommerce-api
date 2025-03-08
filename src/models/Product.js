import { DataTypes } from "sequelize";
import Category from "./Category.js";
import sequelize from "../db/index.js";


const Product = sequelize.define("Product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: Category,
        key: 'id',
    },
  },
});

export default Product;
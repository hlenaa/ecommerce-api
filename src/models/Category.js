import { DataTypes } from "sequelize";
import sequelize from "../db/index.js"; 

//model
const Category = sequelize.define("Category", {
name: {type: DataTypes.STRING, allowNull: false, unique: true},
});

export default Category;

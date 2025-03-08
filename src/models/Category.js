import { DataTypes } from "sequelize";
import sequalize from "../db/index.js"; 

//model
const Category = sequalize.define("Category", {
name: {type: DataTypes.STRING, allowNull: false},
});

Category.sync(); //create the table if it does not exist

export default Category;
import { DataTypes } from "sequelize";


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
    type: DataTypes.STRING,
  },
});

export default Product;
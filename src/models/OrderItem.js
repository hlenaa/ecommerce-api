import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const OrderItem = sequelize.define("OrderItem", {
  orderId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Order",
      key: "id",
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Product",
      key: "id",
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default OrderItem;
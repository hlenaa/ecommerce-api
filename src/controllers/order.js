import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import { formatOrderResponse } from "../utils/OrderResponseFormat.js";

export const getOrders = async (req, res) => {
  const orders = await Order.findAll({
    include: [
      { model: User, attributes: ["id"] }, 
      {
        model: Product,
        attributes: ["id"], 
        through: { attributes: ["quantity"] }, 
      },
    ],
  });

  res.json(
    orders.map((order) => formatOrderResponse(order, order.Products || []))
  );
};

export const getOrderById = async (req, res) => {
  res.json(formatOrderResponse(req.order)); 
};

export const createOrder = async (req, res) => {
  const { userId, products } = req.body;
  const foundProducts = req.foundProducts; 

  const total = foundProducts.reduce((sum, product) => {
    const productInOrder = products.find((p) => p.productId === product.id);
    return sum + product.price * productInOrder.quantity;
  }, 0);

  const order = await Order.create({ userId, total });

  const orderItems = products.map((p) => ({
    orderId: order.id,
    productId: p.productId,
    quantity: p.quantity,
  }));
  await OrderItem.bulkCreate(orderItems);

  const userWithOrder = await order.getUser();
  const productsWithOrder = await order.getProducts({
    joinTableAttributes: ["quantity"],
  });

  res.json(formatOrderResponse(order, productsWithOrder));
};

export const updateOrder = async (req, res) => {
  const { userId, products } = req.body;
  const order = req.order;
  const foundProducts = req.foundProducts;

  const total = foundProducts.reduce((sum, product) => {
    const productInOrder = products.find((p) => p.productId === product.id);
    return sum + product.price * productInOrder.quantity;
  }, 0);

  await order.update({ userId, total });

  for (const p of products) {
    await OrderItem.upsert({
      orderId: order.id,
      productId: p.productId,
      quantity: p.quantity,
    });
  }

  const updatedUser = await order.getUser();
  const updatedProducts = await order.getProducts({
    joinTableAttributes: ["quantity"],
  });

  res.json(formatOrderResponse(order, updatedProducts));
};

export const deleteOrder = async (req, res) => {
  await req.order.destroy();
  res.json({ message: "Order deleted successfully" });
};
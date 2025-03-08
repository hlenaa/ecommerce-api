import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import ExtendedError from "../utils/ExtendedError.js";

export const getOrders = async (req, res) => {
  const orders = await Order.findAll({
    include: [
      { model: User, attributes: ["id"] }, // Only include userId, no personal data
      {
        model: Product,
        attributes: ["id"], // Only need productId
        through: { attributes: ["quantity"] }, // Include quantity from OrderItem
      },
    ],
  });

  const formattedOrders = orders.map((order) => ({
    id: order.id,
    userId: order.userId,
    products: order.Products.map((product) => ({
      productId: product.id,
      quantity: product.OrderItem.quantity,
    })),
    total: order.total,
  }));

  res.json(formattedOrders);
};

export const getOrderById = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findByPk(id, {
    include: [
      { model: User, attributes: ["id"] }, // Only include userId, no personal data
      {
        model: Product,
        attributes: ["id"], // Only need productId
        through: { attributes: ["quantity"] }, // Include quantity from OrderItem
      },
    ],
  });

  if (!order) throw new ExtendedError(404, "Order not found");

  const formattedOrder = {
    id: order.id,
    userId: order.userId,
    products: order.Products.map((product) => ({
      productId: product.id,
      quantity: product.OrderItem.quantity,
    })),
    total: order.total,
  };

  res.json(formattedOrder);
};

export const createOrder = async (req, res) => {
  const { userId, products } = req.body;

  // Validation
  if (
    !userId ||
    !products ||
    !Array.isArray(products) ||
    products.length === 0
  ) {
    throw new ExtendedError(400, "userId and products (array) are required");
  }

  const user = await User.findByPk(userId);
  if (!user) throw new ExtendedError(400, "User does not exist");

  const productIds = products.map((p) => p.productId);
  const foundProducts = await Product.findAll({ where: { id: productIds } });

  if (foundProducts.length !== productIds.length) {
    throw new ExtendedError(400, "One or more products do not exist");
  }

  // Calculate total price
  const total = foundProducts.reduce((sum, product) => {
    const productInOrder = products.find((p) => p.productId === product.id);
    return sum + product.price * productInOrder.quantity;
  }, 0);

  // Create order with total price
  const order = await Order.create({ userId, total });

  // Set products with quantity
  const orderItems = products.map((p) => ({
    orderId: order.id,
    productId: p.productId,
    quantity: p.quantity,
  }));
  await OrderItem.bulkCreate(orderItems);

  // Fetch user and products
  const userWithOrder = await order.getUser();
  const productsWithOrder = await order.getProducts({
    joinTableAttributes: ["quantity"],
  });

  order.dataValues.user = userWithOrder;
  order.dataValues.products = productsWithOrder;

  const formattedResponse = {
    id: order.id,
    userId: order.userId,
    products: productsWithOrder.map((product) => ({
      productId: product.id,
      quantity: product.OrderItem.quantity,
    })),
    total: order.total,
  };

  res.json(formattedResponse);
};

export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { userId, products } = req.body;

  if (
    !userId ||
    !products ||
    !Array.isArray(products) ||
    products.length === 0
  ) {
    throw new ExtendedError(400, "userId and products (array) are required");
  }

  // Find the order
  const order = await Order.findByPk(id);
  if (!order) throw new ExtendedError(404, "Order not found");

  // Check if the user exists
  const user = await User.findByPk(userId);
  if (!user) throw new ExtendedError(400, "User does not exist");

  // Validate if products exist
  const productIds = products.map((p) => p.productId);
  const foundProducts = await Product.findAll({ where: { id: productIds } });

  if (foundProducts.length !== productIds.length) {
    throw new ExtendedError(400, "One or more products do not exist");
  }

  // Calculate new total price
  const total = foundProducts.reduce((sum, product) => {
    const productInOrder = products.find((p) => p.productId === product.id);
    return sum + product.price * productInOrder.quantity;
  }, 0);

  // Update order
  await order.update({ userId, total });

  // Update products in OrderItem
  for (const p of products) {
    await OrderItem.upsert({
      orderId: order.id,
      productId: p.productId,
      quantity: p.quantity, 
    });
  }

  // Fetch updated order using Sequelize helper methods
  const updatedUser = await order.getUser(); // Fetch associated user
  const updatedProducts = await order.getProducts({
    joinTableAttributes: ["quantity"], // Include quantity from OrderItem
  });

  order.dataValues.user = updatedUser;
  order.dataValues.products = updatedProducts;

  const formattedResponse = {
    id: order.id,
    userId: order.userId,
    products: updatedProducts.map((product) => ({
      productId: product.id,
      quantity: product.OrderItem.quantity,
    })),
    total: order.total,
  };

  res.json(formattedResponse);
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findByPk(id);

  if (!order) throw new ExtendedError(404, "Order not found");

  await order.destroy();
  res.json({ message: "Order deleted successfully" });
}
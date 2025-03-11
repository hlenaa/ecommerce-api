export const formatOrderResponse = (order) => ({
  id: order.id,
  userId: order.userId,
  products: order.Products.map((product) => ({
    productId: product.id,
    quantity: product.OrderItem.quantity,
  })),
  total: order.total,
});
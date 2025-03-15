export const formatOrderResponse = (order, products = order.Products || []) => ({
  id: order.id,
  userId: order.userId,
  products: products.map((product) => ({
    productId: product.id,
    quantity: product.OrderItem.quantity,
  })),
  total: order.total,
});
import { Router } from 'express';
import { createOrder, getOrders, getOrderById, updateOrder, deleteOrder } from '../controllers/order.js';
import { orderChecker, productsChecker, userChecker } from '../middleware/orderChecks.js';
import schemaChecker from '../middleware/schemaCheck.js';
import orderSchema from '../schemas/orderSchema.js';

const orderRouter = Router();

orderRouter
.route('/')
.get(getOrders)
.post(schemaChecker(orderSchema), userChecker, productsChecker, createOrder);

orderRouter
.route('/:id')
.get(orderChecker, getOrderById)
.put(orderChecker, schemaChecker(orderSchema), userChecker, productsChecker, updateOrder)
.delete(orderChecker, deleteOrder);

export default orderRouter;
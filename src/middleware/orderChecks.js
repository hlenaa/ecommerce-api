import User from '../models/User.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import ExtendedError from '../utils/ExtendedError.js';

export const orderChecker = async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id, {
            include: [
              { model: User, attributes: ["id"] }, 
              {
                model: Product,
                attributes: ["id"], 
                through: { attributes: ["quantity"] }, 
              },
            ],
          });
        
        if (!order) throw new ExtendedError(404, "Order not found");

        req.order = order;
        next();
    } catch (err) {
        next(new ExtendedError(404, err.message));
    }
};

// Checks products array
export const productsChecker = async (req, res, next) => {
    try {
        const productIds = req.body.products.map((p) => p.productId);
        const foundProducts = await Product.findAll({ where: { id: productIds } });
      
        if (foundProducts.length !== productIds.length) {
          return next(new ExtendedError(400, "One or more products do not exist"));
        }
      
        req.foundProducts = foundProducts; 
        next();
    } catch (err) {
        next(new ExtendedError(404, err.message));
    }
}

export const userChecker = async (req, res, next) => {
    try {
        const { userId } = req.body;
        const user = await User.findByPk(userId);
      
        if (!user) throw new ExtendedError(400, "User does not exist");
      
        req.user = user;
        next();
    } catch (err) {
        next(new ExtendedError(404, err.message));
    }
}
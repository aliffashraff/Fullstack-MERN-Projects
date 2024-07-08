import express from 'express';
import {
  placeOrder,
  userOrders,
  verifyOrder,
} from '../controllers/orderController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const orderRouter = express.Router();

orderRouter.route('/place').post(authMiddleware, placeOrder);
orderRouter.route('/verify').post(verifyOrder);
orderRouter.route('/userorders').post(authMiddleware, userOrders);

export default orderRouter;

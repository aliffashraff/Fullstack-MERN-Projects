import express from 'express';
import {
  listOrders,
  placeOrder,
  updateStatus,
  userOrders,
  verifyOrder,
} from '../controllers/orderController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const orderRouter = express.Router();

orderRouter.route('/place').post(authMiddleware, placeOrder);
orderRouter.route('/verify').post(verifyOrder);
orderRouter.route('/userorders').post(authMiddleware, userOrders);
orderRouter.route('/list').get(listOrders);
orderRouter.route('/status').post(updateStatus);

export default orderRouter;

import express from 'express';
import { placeOrder, verifyOrder } from '../controllers/orderController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const orderRouter = express.Router();

orderRouter.route('/place').post(authMiddleware, placeOrder);
orderRouter.route('/verify').post(authMiddleware, verifyOrder);

export default orderRouter;

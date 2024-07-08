import express from 'express';
import { placeOrder } from '../controllers/orderController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const orderRouter = express.Router();

orderRouter.route('/place').post(authMiddleware, placeOrder);

export default orderRouter;

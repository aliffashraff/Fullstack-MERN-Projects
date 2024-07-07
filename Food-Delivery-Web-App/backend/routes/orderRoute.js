import express from 'express';
import { placeOrder } from '../controllers/orderController.js';
import authMddleware from '../middlewares/authMiddleware.js';

const orderRouter = express.Router();

orderRouter.route('/place').post(authMddleware, placeOrder);

export default orderRouter;

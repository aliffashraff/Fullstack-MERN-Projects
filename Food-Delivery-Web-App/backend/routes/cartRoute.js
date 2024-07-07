import express from 'express';
import {
  getCart,
  removeFromCart,
  addToCart,
} from '../controllers/cartController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const cartRouter = express.Router();

// authenticate user first using auth middleware before creating a request
cartRouter.route('/add').post(authMiddleware, addToCart);
cartRouter.route('/remove').post(authMiddleware, removeFromCart);
cartRouter.route('/get').get(authMiddleware, getCart);

export default cartRouter;

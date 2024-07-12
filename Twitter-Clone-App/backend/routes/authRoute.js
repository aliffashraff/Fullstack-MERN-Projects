import express from 'express';
import { getMe, login, logout, signup } from '../controllers/authController.js';
import protectMiddleware from '../middlewares/protectMiddleware.js';

const authRouter = express.Router();

// get authenticated user
authRouter.get('/me', protectMiddleware, getMe); // protected route
authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/logout', logout);

export default authRouter;

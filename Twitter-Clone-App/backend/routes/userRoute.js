import express from 'express';
import protectMiddleware from '../middlewares/protectMiddleware.js';
import {
  followUnfollowUser,
  getSuggestedUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.route('/profile/:username').get(protectMiddleware, getUserProfile);
userRouter.route('/suggested').get(protectMiddleware, getSuggestedUser);
userRouter.route('/follow/:userId').post(protectMiddleware, followUnfollowUser);
userRouter.route('/update').post(protectMiddleware, updateUserProfile);

export default userRouter;

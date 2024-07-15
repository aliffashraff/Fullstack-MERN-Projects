import express from 'express';
import protectMiddleware from '../middlewares/protectMiddleware.js';
import {
  commentOnPost,
  createPost,
  deletePost,
  getAllPosts,
  getFollowingsPosts,
  getLikedPosts,
  getUserPosts,
  likeUnlikePost,
} from '../controllers/postController.js';

const postRouter = express.Router();

postRouter.route('/all').get(protectMiddleware, getAllPosts);
postRouter.route('/user/:username').get(protectMiddleware, getUserPosts);
postRouter.route('/followings').get(protectMiddleware, getFollowingsPosts);
postRouter.route('/likes/:userId').get(protectMiddleware, getLikedPosts);
postRouter.route('/create').post(protectMiddleware, createPost);
postRouter.route('/like/:postId').post(protectMiddleware, likeUnlikePost);
postRouter.route('/comment/:postId').post(protectMiddleware, commentOnPost);
postRouter.route('/delete/:postId').delete(protectMiddleware, deletePost);

export default postRouter;

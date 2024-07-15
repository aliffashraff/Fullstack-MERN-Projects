import express from 'express';
import protectMiddleware from '../middlewares/protectMiddleware.js';
import {
  deleteNotifications,
  deleteSingleNotification,
  getNotifications,
} from '../controllers/notificationController.js';

const notificationRouter = express.Router();

notificationRouter.route('/').get(protectMiddleware, getNotifications);
notificationRouter.route('/').delete(protectMiddleware, deleteNotifications);
notificationRouter
  .route('/:id')
  .delete(protectMiddleware, deleteSingleNotification);

export default notificationRouter;

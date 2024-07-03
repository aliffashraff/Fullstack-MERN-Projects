import express from 'express';
import { addFood } from '../controllers/foodController.js';
// import multer to create image storage system
import multer from 'multer';

const foodRouter = express.Router();



foodRouter.route('/add').post(addFood);

export default foodRouter;

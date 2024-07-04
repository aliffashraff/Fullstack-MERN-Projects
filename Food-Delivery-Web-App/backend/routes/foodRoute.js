import express from 'express';
import {
  addFood,
  deleteFood,
  getAllFood,
} from '../controllers/foodController.js';
// import multer to handle file uploads in Express app
import multer from 'multer';

const foodRouter = express.Router();

// image storage engine - configure how files are stored
const storage = multer.diskStorage({
  // stored the file in the uploads folder
  // no need to provide full path, folder will be created if it is not existed
  destination: 'uploads',
  // to create unique filename (timestamp + originalname)
  filename: (req, file, callback) => {
    return callback(null, `${Date.now()}${file.originalname}`);
  },
});

// middleware to upload the folder
const upload = multer({ storage: storage });

foodRouter.route('/add').post(upload.single('image'), addFood);
foodRouter.route('/list').get(getAllFood);
// using post method to delete
foodRouter.route('/remove').post(deleteFood);

export default foodRouter;

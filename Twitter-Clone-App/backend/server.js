// packages
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';

// files
import connectDB from './db/connectDB.js';
import authRouter from './routes/authRoute.js';
import userRouter from './routes/userRoute.js';
import postRouter from './routes/postRoute.js';

// config
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // to parse form data - can use FormData to send req
app.use(cookieParser()); // parse cookies in request

// routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);

// run server
app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}...`);
});

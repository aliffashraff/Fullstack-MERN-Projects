// packages
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// files
import connectDB from './db/connectDB.js';
import authRouter from './routes/authRoute.js';

// config
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // to parse form data - can use FormData to send req
app.use(cookieParser()); // parse cookies in request

// routes
app.use('/api/auth', authRouter);

// run server
app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}...`);
});

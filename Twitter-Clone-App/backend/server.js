// packages
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

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

// routes
app.use('/api/auth', authRouter);

// run server
app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}...`);
});

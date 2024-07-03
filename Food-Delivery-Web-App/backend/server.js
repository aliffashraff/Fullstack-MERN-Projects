import express from 'express';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import { config } from 'dotenv';
import connectDB from './config/db.js';

// setup config .env
config();

// app config
const app = express();

// middlewares
app.use(express.json()); // parse JSON
app.use(cors()); // can access backend from any frontend

// test API response
app.get('/', (req, res) => {
  res.status(StatusCodes.OK).send('Hello World');
});

// connect DB and listen to port
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI).then(() =>
      console.log('DB connected')
    );
    app.listen(port, () =>
      console.log(`Server is listeneing on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

// run app
start();

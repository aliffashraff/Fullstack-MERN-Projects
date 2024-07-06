// packages
import express from 'express';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';
import { config } from 'dotenv'; // or import 'dotenv/config'

// files
import connectDB from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';

// configuration
config(); // to use .env
const app = express();

// middlewares
app.use(express.json()); // parse JSON
app.use(cors()); // can access backend from any frontend

// routes
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads')); // mount the folder at the route to access the images in the browser eg: http://localhost:3000/images/1720031957221food_1.png
app.use('/api/user', userRouter);

// test API response
app.get('/', (req, res) => {
  res.status(StatusCodes.OK).send('Hello World');
});

// port
const port = process.env.PORT || 3000;

// database connection and listen for connection
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI).then(() =>
      console.log('DB connected')
    );
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

// run app
start();

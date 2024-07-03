import express from 'express';
import cors from 'cors';
import { StatusCodes } from 'http-status-codes';

// setup app in express environment
const app = express();

// middlewares
app.use(express.json()); // parse JSON
app.use(cors()); // can access backend from any frontend

// test API response
app.get('/', (req, res) => {
  res.status(StatusCodes.OK).send('Hello World');
});

// app config
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    app.listen(port, () => console.log(`Server is listeneing on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

// run app
start();

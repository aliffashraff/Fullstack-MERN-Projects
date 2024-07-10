// packages
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// files
import connectDB from './db/db.js';
import authRouter from './routes/authRoute.js';

// config
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use('/api/auth', authRouter);

const start = async () => {
  try {
    connectDB(process.env.MONGO_URI);
    console.log('DB is connected');
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log('Databese is not connected:', error);
  }
};

start();

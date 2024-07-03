// import node builtin file system
import fs from 'fs';
import { StatusCodes } from 'http-status-codes';
// import model
import FoodModel from '../models/FoodModel.js';

// add food item
const addFood = async (req, res) => {
  const food = await FoodModel.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ food });
};

export { addFood };

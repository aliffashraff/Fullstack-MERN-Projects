// import node builtin file system
import fs from 'fs';
import { StatusCodes } from 'http-status-codes';
// import model
import FoodModel from '../models/FoodModel.js';

// add food item
const addFood = async (req, res) => {
  /* // using new FoodModel and await food.save()
  is good if want to manipulate the food instance 
  // variable to store uploaded filename
  let image_filename = `${req.file.filename}`;

  // food instance to access sent details from body
  const food = new FoodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    // save the instance in database
    const savedFood = await food.save();
    res
      .status(StatusCodes.CREATED)
      .json({ succes: true, message: 'Food Added', savedFood });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: error.message });
  }*/

  try {
    const food = await FoodModel.create({
      ...req.body,
      image: req.file.filename,
    });
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Food Added',
      food,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: error.message });
  }
};

export { addFood };

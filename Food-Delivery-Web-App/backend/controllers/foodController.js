// import node builtin file system
import fs from 'fs';
import { StatusCodes } from 'http-status-codes';
// import model
import FoodModel from '../models/FoodModel.js';

// create food item
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
    });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({
        success: false,
        message: 'Unable to Add Food',
        error: error.message,
      });
  }
};

// get all food
const getAllFood = async (req, res) => {
  try {
    const foods = await FoodModel.find().sort('-updatedAt');
    res.status(StatusCodes.OK).json({ success: true, data: foods });
  } catch (error) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ success: false, message: 'Unable to Load Food List', error: error.message });
  }
};

// remove food item
const deleteFood = async (req, res) => {
  try {
    // delete image from uploads file
    const food = await FoodModel.findOne({ _id: req.body._id });
    fs.unlink(`uploads/${food.image}`, () => {});

    //delete from database
    await FoodModel.findOneAndDelete({ _id: req.body._id });
    res.status(StatusCodes.OK).json({ success: true, message: 'Food Removed' });
  } catch (error) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({
        success: false,
        message: 'Unable to Remove Food',
        error: error.message,
      });
  }
};

export { addFood, getAllFood, deleteFood };

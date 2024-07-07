import UserModel from '../models/UserModel.js';
import { StatusCodes } from 'http-status-codes';

// add items to user cart
const addToCart = async (req, res) => {
  try {
    // get userId where it is assign to req.body.userId by the authMiddleware
    // get itemId passed from frontend
    const { userId, itemId } = req.body;

    // get userData
    const userData = await UserModel.findOne({ _id: userId }).select(
      '-password'
    );
    let { cart } = userData;

    // if no entry of the itemId in cart, itemId=1
    if (!cart[itemId]) {
      cart[itemId] = 1;
    } else {
      // if there already an entry with the itemId
      cart[itemId] += 1;
    }

    // update user cart with new cart
    await UserModel.findOneAndUpdate(
      { _id: userId },
      { cart },
      { new: true, runValidators: true }
    ).select('-password');

    res.status(StatusCodes.OK).json({ succes: true, message: 'Added to Cart' });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({
      succes: false,
      message: 'Unable to Add to Cart',
      error: error.message,
    });
  }
};

// remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    const userData = await UserModel.findOne({ _id: userId }).select(
      '-password'
    );
    let { cart } = userData;

    if (cart[itemId] > 0) {
      cart[itemId] -= 1;
    } else {
      cart[itemId] = 0;
    }

    await UserModel.findOneAndUpdate(
      { _id: userId },
      { cart },
      { new: true, runValidators: true }
    ).select('-password');

    res
      .status(StatusCodes.OK)
      .json({ success: true, message: 'Remove from Cart' });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({
      succes: false,
      message: 'Unable to Remove from Cart',
      error: error.message,
    });
  }
};

// fetch user cart
const getCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    const userData = await UserModel.findOne({ _id: userId }).select(
      '-password'
    );
    const { cart } = userData;

    res
      .status(StatusCodes.OK)
      .json({ success: true, message: 'Load User Cart', data: cart });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({
      succes: false,
      message: 'Failed to Load User Cart',
      error: error.message,
    });
  }
};

export { addToCart, removeFromCart, getCart };

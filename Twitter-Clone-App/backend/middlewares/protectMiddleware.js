import { StatusCodes } from 'http-status-codes';
import UserModel from '../models/UserModel.js';
import jwt from 'jsonwebtoken';

const protectMiddleware = async (req, res, next) => {
  try {
    // parse cookies to get token using cookie parser
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        error: 'Authentication Error: No token provided',
      });
    }

    // decode token to get userId payload
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!payload) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ success: false, error: 'Authentication Error: Invalid token' });
    }

    const { userId } = payload;

    // const user = await UserModel.findOne({ _id: userId }).select('-password');

    // if (!user) {
    //   return res.status(StatusCodes.NOT_FOUND).json({
    //     success: false,
    //     error: 'User not found',
    //   });
    // }

    // pass all user details(except password) in req.user
    // req.user = user;

    // pass userId
    req.user = { userId };

    next();
  } catch (error) {
    console.log('Error in protectMiddleware: ', error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: 'Internal Server Error' });
  }
};

export default protectMiddleware;

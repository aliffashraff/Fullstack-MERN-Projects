import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import UserModel from '../models/UserModel.js';

const authMiddleware = async (req, res, next) => {
  // in frontend, before making a request, the token is put from localstorage to the headers
  // get the token from the header
  const { token } = req.headers;

  try {
    // check if the token exist
    if (!token) {
      throw new Error('Not Authorized. Please login again');
    }

    // decode token to get payload with correct secret
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // get userId from payload (from createToken func)
    const { userId } = payload;

    // middleware convert token to userId
    // create userId property in req.body object and with payload userId value
    // cannot user req.body = {userId} bcs its overwrite the body
    req.body.userId = userId;

    next(); // pass to controller
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ success: false, message: error.message });
  }
};

export default authMiddleware;

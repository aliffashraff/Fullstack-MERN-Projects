// packages
import { StatusCodes } from 'http-status-codes';
import validator from 'validator';
import bcrypt from 'bcryptjs';

import UserModel from '../models/UserModel.js';
import generateTokenAndSetCookie from '../lib/utils/generateToken.js';

const signup = async (req, res) => {
  try {
    const { username, fullName, email, password } = req.body;

    if (!username || !fullName || !email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, error: 'Please complete all the fields' });
    }

    const existingUsername = await UserModel.findOne({ username });
    const existingEmail = await UserModel.findOne({ email });

    if (existingUsername) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, error: 'Username already taken' });
    }

    if (existingEmail) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, error: 'Email already exist' });
    }

    if (!validator.isEmail(email)) {
      // user return if not use throw error
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, error: 'Invalid email format' });
    }

    if (password.length < 6) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        error: 'Password must be at least 6 characters long',
      });
    }

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create({
      username,
      fullName,
      email,
      password: hashPassword,
    });

    if (newUser) {
      // create token and send to browser cookie
      generateTokenAndSetCookie(newUser._id, res);

      const user = await UserModel.findById(newUser._id).select('-password');

      res.status(StatusCodes.CREATED).json({
        success: true,
        message: 'Account created',
        data: user,
        // no need to send token
      });
    } else {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, error: 'Invalid user data' });
    }
  } catch (error) {
    console.log('Error in signup controller: ', error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });

    // compare password
    const isPasswordMatch = await bcrypt.compare(
      password,
      // incase it is empty at least compare to an empty string to avoid app from crashing
      user?.password || ''
    );

    if (!user || !isPasswordMatch) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        error: 'Invalid username or password',
      });
    }

    // create token
    generateTokenAndSetCookie(user._id, res);

    const {
      _id,
      fullName,
      email,
      followings,
      followers,
      profileImage,
      coverImage,
      bio,
      link,
      likedPosts,
      createdAt,
    } = user;

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Login successful',
      data: {
        username,
        _id,
        fullName,
        email,
        followings,
        followers,
        profileImage,
        coverImage,
        bio,
        link,
        likedPosts,
        createdAt,
      },
    });
  } catch (error) {
    console.log('Error in login controller: ', error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: 'Internal Server Error' });
  }
};

const logout = async (req, res) => {
  try {
    // kill the cookie
    res.cookie('jwt', '', { maxAge: 0 });

    res
      .status(StatusCodes.OK)
      .json({ success: true, message: 'Logged out succesful' });
  } catch (error) {
    console.log('Error in logout controller: ', error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: 'Internal Server Error' });
  }
};

const getMe = async (req, res) => {
  try {
    // get userId from req.user assigned in authMiddleware
    // rename _id to userId - same as const userId = req.user._id
    const { userId } = req.user;
    const user = await UserModel.findOne({ _id: userId }).select('-password');

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, error: 'User not found' });
    }

    res
      .status(StatusCodes.OK)
      .json({ success: true, message: 'User authorized', data: user });
  } catch (error) {
    console.log('Error in getMe controller: ', error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: 'Internal Server Error' });
  }
};

export { signup, login, logout, getMe };

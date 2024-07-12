import { StatusCodes } from 'http-status-codes';
import UserModel from '../models/UserModel.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../lib/utils/generateToken.js';

const signup = async (req, res) => {
  try {
    const { username, fullName, email, password } = req.body;

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

      res.status(StatusCodes.CREATED).json({
        success: true,
        message: 'Account created',
        data: {
          username: newUser.username,
          fullName: newUser.fullName,
          email: newUser.email,
          followings: newUser.followings,
          followers: newUser.followers,
          profileImage: newUser.profileImage,
          coverImage: newUser.coverImage,
          bio: newUser.bio,
          link: newUser.link,
        },
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
        error:
          'Invalid credentials. Please provide correct password and username',
      });
    }

    // create token
    generateTokenAndSetCookie(user._id, res);

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Login successful',
      data: {
        fullName: user.fullName,
        email: user.email,
        followings: user.followings,
        followers: user.followers,
        profileImage: user.profileImage,
        coverImage: user.coverImage,
        bio: user.bio,
        link: user.link,
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
  // get userId from req.user assigned in authMiddleware
  const { _id } = req.user;
  try {
    const user = await UserModel.findOne({ _id }).select('-password');
    res
      .status(StatusCodes.OK)
      .json({ success: false, message: 'User authorized', data: user });
  } catch (error) {
    console.log('Error in getMe controller: ', error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: 'Internal Server Error' });
  }
};

export { signup, login, logout, getMe };

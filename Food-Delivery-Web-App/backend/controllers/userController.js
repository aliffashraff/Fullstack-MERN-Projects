import UserModel from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import valdator from 'validator';
import { StatusCodes } from 'http-status-codes';
import validator from 'validator';

const createToken = (userId) => {
  // pass user id to the token as payload using .sign
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

// register
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // check if there is already a user with the email
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      throw new Error('User already exist');
    }
    // check if user's email is a valid email
    if (!validator.isEmail) {
      throw new Error('Please provide valid email');
    }
    // check for strong password
    if (password.length < 8) {
      throw new Error('Please provide strong password');
    }

    //encrypt & hash user password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // create new user with name, email and hashpassword
    const newUser = await UserModel.create({
      name,
      email,
      password: hashPassword,
    });

    // create token
    const token = createToken(newUser._id);

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Account Created',
      data: { user: { name: newUser.name } },
      token,
    });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

// login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check email and password not empty
    if (!email || !password) {
      throw new Error('Please provide email and password');
    }

    const user = await UserModel.findOne({ email });

    // check if there is a user with the email
    if (!user) {
      throw new Error('User not found. Please register');
    }

    // compare entered password with the password in the db
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error('Invalid credentials. Please provide correct password');
    }

    // create token
    const token = createToken(user._id);

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Login Successful',
      data: { user: { name: user.name } },
      token,
    });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: error.message });
  }
};

export { registerUser, loginUser };

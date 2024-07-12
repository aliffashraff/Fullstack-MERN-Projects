import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
  // create token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  // send token as a cookie
  // syntax: res.cookie('name', token, options)
  res.cookie('jwt', token, {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in ms
    httpOnly: true, // preevent xss attack
    sameSite: 'strict', // prevent CSRF attack
    // will be true if NODE_ENV not eaual to development
    secure: process.env.NODE_ENV !== 'development', // for https
  });
};

export default generateTokenAndSetCookie;

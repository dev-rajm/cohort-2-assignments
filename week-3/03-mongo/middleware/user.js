const { User } = require('../db');

async function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const { username, password } = req.headers;
  const userExist = await User.findOne({
    username,
    password,
  });

  if (!userExist) {
    return res.status(403).json({
      message: 'User not found',
    });
  }
  next();
}

module.exports = userMiddleware;

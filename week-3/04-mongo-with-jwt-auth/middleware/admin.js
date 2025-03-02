const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

function adminMiddleware(req, res, next) {
  const token = req.headers.authorization;
  const words = token.split(' ');
  const jwtToken = words[1];

  try {
    const decoder = jwt.verify(jwtToken, JWT_SECRET);
    if (decoder.username) {
      next();
    } else {
      res.json({
        message: 'You are not authenticated',
      });
    }
  } catch (err) {
    res.json({
      message: 'Invalid token',
    });
  }
}

module.exports = adminMiddleware;

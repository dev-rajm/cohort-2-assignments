const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

function userMiddleware(req, res, next) {
  const token = req.headers.authorization;
  const jwtToken = token.split(' ')[1];
  const decoder = jwt.verify(jwtToken, JWT_SECRET);

  if (decoder.username) {
    req.username = decoder.username;
    req.randomData = 'Adsadsadsadssd';
    next();
  } else {
    res.status(403).json({
      msg: 'You are not authenticated',
    });
  }
}

module.exports = userMiddleware;

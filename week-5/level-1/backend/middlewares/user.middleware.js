import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

function userMiddleware(req, res, next) {
  const token = req.headers.authorization;
  const parseToken = token.split(' ')[1];
  const decoder = jwt.verify(parseToken, process.env.JWT_SECRET);

  if (decoder.username) {
    req.username = decoder.username;
    next();
  } else {
    return res.status(403).json({
      message: 'Unauthenticated.',
    });
  }
}

export default userMiddleware;

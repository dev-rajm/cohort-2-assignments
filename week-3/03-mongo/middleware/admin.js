const { Admin } = require('../db');

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const { username, password } = req.headers;
  const adminExist = await Admin.findOne({
    username,
    password,
  });

  if (!adminExist) {
    return res.status(403).json({
      message: 'Admin not found',
    });
  }
  next();
}

module.exports = adminMiddleware;

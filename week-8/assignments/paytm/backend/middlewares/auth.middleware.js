import jwt from "jsonwebtoken";
import JWT_SECRET from "../config.js";

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(411).json({
      message: "Unauthorized",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(`Error in auth middleware: ${error.message}`);
    return res.status(403).json({ message: error });
  }
}

export default authMiddleware;

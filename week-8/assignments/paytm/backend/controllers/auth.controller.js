import {
  signupSchema,
  signinSchema,
  changePasswordSchema,
} from "../schemas/user.schema.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import JWT_SECRET from "../config.js";

export const signup = async (req, res) => {
  const createPayload = req.body;
  try {
    if (
      !createPayload.firstName ||
      !createPayload.lastName ||
      !createPayload.username ||
      !createPayload.password
    ) {
      return res.status(411).json({ message: "All fields are required" });
    }
    const parsePayload = signupSchema.safeParse(createPayload);
    if (!parsePayload.success) {
      return res.status(411).json({
        message: "Invalid inputs",
      });
    }
    const user = User.findOne({ username: createPayload.username });
    if (user._id) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const newUser = await User.create(createPayload);
    const token = jwt.sign(
      {
        userId: newUser._id,
      },
      JWT_SECRET
    );

    res.status(201).json({
      message: "User created successfully",
      token: token,
    });
  } catch (error) {
    console.log(`Error in signup controller: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const signin = async (req, res) => {};
export const changePassword = async (req, res) => {};

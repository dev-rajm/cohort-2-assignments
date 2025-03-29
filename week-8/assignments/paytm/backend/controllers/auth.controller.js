import jwt from 'jsonwebtoken';
import JWT_SECRET from '../config.js';
import User from '../models/user.model.js';
import Account from '../models/account.model.js';

import {
  signupSchema,
  signinSchema,
  updateUserSchema,
} from '../schemas/user.schema.js';

export const signup = async (req, res) => {
  const createPayload = req.body;
  try {
    if (
      !createPayload.firstName ||
      !createPayload.lastName ||
      !createPayload.username ||
      !createPayload.password
    ) {
      return res.status(411).json({ message: 'All fields are required' });
    }
    const parsePayload = signupSchema.safeParse(createPayload);
    if (!parsePayload.success) {
      return res.status(411).json({
        message: 'Invalid inputs',
      });
    }
    const user = await User.findOne({ username: createPayload.username });
    if (user) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    const newUser = await User.create(createPayload);
    const userId = newUser._id;

    await Account.create({
      userId,
      balance: 1 + Math.random() * 10000,
    });

    const token = jwt.sign(
      {
        userId: userId,
      },
      JWT_SECRET
    );

    res.status(201).json({
      message: 'User created successfully',
      token: token,
    });
  } catch (error) {
    console.log(`Error in signup controller: ${error.message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const signin = async (req, res) => {
  const createPayload = req.body;
  try {
    if (!createPayload.username || !createPayload.password) {
      return res.status(411).json({ message: 'All fields are required' });
    }
    const parsePayload = signinSchema.safeParse(createPayload);
    if (!parsePayload.success) {
      return res.status(411).json({
        message: 'Invalid inputs',
      });
    }

    const user = await User.findOne({
      username: createPayload.username,
      password: createPayload.password,
    });
    if (!user) {
      return res.status(411).json({
        message: "User doesn't exists",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );
    res.status(200).json({
      message: 'User logged in successfully',
      token: token,
    });
  } catch (error) {
    console.log(`Error in signin controller: ${error.message}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateUser = async (req, res) => {
  const createPayload = req.body;
  const parsePayload = updateUserSchema.safeParse(createPayload);
  if (!parsePayload.success) {
    return res.status(411).json({
      message: 'Invalid inputs',
    });
  }

  await User.updateOne(
    {
      _id: req.userId,
    },
    createPayload
  );

  res.status(200).json({
    message: 'User updated successfully',
  });
};

export const filterUser = async (req, res) => {
  const filter = req.query.filter || '';
  const users = await User.find({
    $or: [{ firstName: { $regex: filter } }, { lastName: { $regex: filter } }],
  });

  res.status(200).json({
    user: users.map(user => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
};

import { Router } from 'express';
import { User } from '../db/index.js';
import { userSchema } from '../schema/types.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const router = Router();

router.post('/signup', async (req, res) => {
  const createPayload = req.body;
  const parsePayload = userSchema.safeParse(createPayload);

  if (!parsePayload.success) {
    return res.status(411).json({
      message: 'Signup failed.',
    });
  }

  const isExist = await User.findOne({ username: createPayload.username });
  if (isExist) {
    return res.status(409).json({
      message: 'Username already exist. Please try to signin.',
    });
  }

  const passwordSalt = await bcrypt.genSalt(parseInt(process.env.SALT));
  const passwordHash = await bcrypt.hash(createPayload.password, passwordSalt);

  await User.create({
    username: createPayload.username,
    password: passwordHash,
  });

  res.status(201).json({
    message: 'User created successfully. Proceed to signin',
  });
});

router.post('/signin', async (req, res) => {
  const createPayload = req.body;
  const parsePayload = userSchema.safeParse(createPayload);

  if (!parsePayload.success) {
    return res.status(411).json({
      message: 'Signup failed.',
    });
  }

  const user = await User.findOne({ username: createPayload.username });
  if (!user) {
    return res.status(411).json({
      message: "User doesn't exist. Please signin first.",
    });
  }

  const verifyPassword = await bcrypt.compare(
    createPayload.password,
    user.password
  );

  if (!verifyPassword) {
    return res.status(411).json({
      message: 'Incorrect credentials.',
    });
  }

  const token = jwt.sign(
    { username: createPayload.username },
    process.env.JWT_SECRET
  );

  res.status(200).json({
    token: token,
    message: 'User authenticated successfully.',
  });
});

export default router;

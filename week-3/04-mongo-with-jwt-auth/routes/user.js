const { Router } = require('express');
const { User, Course } = require('../db');
const { userSchema } = require('../schemas');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const router = Router();
const userMiddleware = require('../middleware/user');

// User Routes
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  const signUpValidate = userSchema.safeParse({
    username: username,
    password: password,
  });

  if (!signUpValidate.success) {
    return res.json({
      message: 'Invalid inputs',
    });
  }

  await User.create({
    username,
    password,
  });

  res.status(201).json({
    message: 'User created successfully',
  });
});

router.post('/signin', async (req, res) => {
  const { username, password } = req.body;
  const signInValidate = userSchema.safeParse({ username, password });
  if (!signInValidate) {
    return res.json({
      message: 'Invalid inputs',
    });
  }

  const user = await User.find({ username });
  if (!user) {
    return res.status(411).json({
      message: "User doesn't exist",
    });
  }

  const token = jwt.sign({ username }, JWT_SECRET);
  res.json({
    token: token,
  });
});

router.get('/courses', async (req, res) => {
  const result = await Course.find({});
  res.json({
    courses: result,
  });
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
  const username = req.headers.username;
  const courseId = req.params.courseId;

  await User.updateOne(
    { username: username },
    {
      $push: {
        purchasedCourses: courseId,
      },
    }
  );

  res.json({
    message: 'Purchase completed',
  });
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
  const user = await User.findOne({ username: req.headers.username });
  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });

  res.json({
    courses: courses,
  });
});

module.exports = router;

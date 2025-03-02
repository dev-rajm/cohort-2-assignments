const { Router } = require('express');
const router = Router();
const userMiddleware = require('../middleware/user');
const { User, Course } = require('../db');

// User Routes
router.post('/signup', async (req, res) => {
  // Implement user signup logic
  const { username, password } = req.body;
  await User.create({
    username,
    password,
  });

  res.status(201).json({
    message: 'User created successfully',
  });
});

router.get('/courses', async (req, res) => {
  // Implement listing all courses logic
  const result = await Course.find({});
  res.status(200).json({
    courses: result,
  });
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const username = req.headers.username;

  await User.updateOne(
    { username: username },
    {
      $push: {
        purchasedCourses: courseId,
      },
    }
  );

  res.status(200).json({
    message: 'Purchase completed',
  });
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
  const user = await User.findOne({ username: req.headers.username });
  console.log(user.purchasedCourses);

  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });

  res.status(200).json({
    courses: courses,
  });
});

module.exports = router;

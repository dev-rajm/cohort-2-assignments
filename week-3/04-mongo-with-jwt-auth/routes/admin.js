const { Router } = require('express');
const adminMiddleware = require('../middleware/admin');
const { Admin, Course } = require('../db');
const { JWT_SECRET } = require('../config');
const jwt = require('jsonwebtoken');
const { adminSchema, courseSchema } = require('../schemas');
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  const signUpValidate = adminSchema.safeParse({
    username: username,
    password: password,
  });

  if (!signUpValidate.success) {
    return res.json({
      message: 'Invalid inputs',
    });
  }

  await Admin.create({
    username,
    password,
  });

  res.status(201).json({
    message: 'Admin created successfully',
  });
});

router.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  const signInValidate = adminSchema.safeParse({
    username: username,
    password: password,
  });

  if (!signInValidate.success) {
    return res.json({
      message: 'Invalid inputs',
    });
  }
  console.log(JWT_SECRET);

  const user = await Admin.find({ username, password });
  if (user) {
    const token = jwt.sign({ username }, JWT_SECRET);
    res.json({
      token,
    });
  } else {
    res.status(411).json({
      message: 'Incorrect credentials',
      token: token,
    });
  }
});

router.post('/courses', adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const { title, description, imageLink, price } = req.body;
  const courseValidate = courseSchema.safeParse({
    title: title,
    description: description,
    imageLink: imageLink,
    price: price,
  });

  if (!courseValidate.success) {
    return res.json({
      message: 'Invalid inputs',
    });
  }

  const newCourse = await Course.create({
    title,
    description,
    imageLink,
    price,
  });

  res.status(201).json({
    message: 'Course created successfully',
    courseId: newCourse._id,
  });
});

router.get('/courses', adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const result = await Course.find({});
  res.json({
    courses: result,
  });
});

module.exports = router;

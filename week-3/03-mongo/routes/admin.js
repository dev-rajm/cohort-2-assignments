const { Router } = require('express');
const adminMiddleware = require('../middleware/admin');
const { Admin, Course } = require('../db');
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  await Admin.create({
    username,
    password,
  });

  res.status(201).json({
    message: 'Admin created successfully',
  });
});

router.post('/courses', adminMiddleware, async (req, res) => {
  const { title, description, imageLink, price } = req.body;

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
  res.status(200).json({
    courses: result,
  });
});

module.exports = router;

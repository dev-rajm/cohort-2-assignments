const z = require('zod');

const courseSchema = z.object({
  title: z.string(),
  description: z.string(),
  imageLink: z.string().url(),
  price: z.number(),
});

const userSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
  purchasedCourses: z.array().optional(),
});

const adminSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

module.exports = {
  courseSchema,
  userSchema,
  adminSchema,
};

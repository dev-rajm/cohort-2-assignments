import { Hono } from 'hono';
import authMiddleware from '../middlewares/auth.middleware';

import {
  signUpHandler,
  signInHandler,
  userProfile,
  getAllUsers,
} from '../controllers/user.controller';

const router = new Hono();

router.post('/signup', signUpHandler); // Handle user signup
router.post('/signin', signInHandler); // Handle user signin

router.get('/user/:id', authMiddleware, userProfile); // Get a specific user (protected)
router.get('/users', authMiddleware, getAllUsers); // Get all users (protected)

export default router;

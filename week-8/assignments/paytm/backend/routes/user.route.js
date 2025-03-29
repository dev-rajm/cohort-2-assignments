import { Router } from 'express';
import {
  filterUser,
  signin,
  signup,
  updateUser,
} from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.put('/', authMiddleware, updateUser);
router.get('/bulk', filterUser);

export default router;

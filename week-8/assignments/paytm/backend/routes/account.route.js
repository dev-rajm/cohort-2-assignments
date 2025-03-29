import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import {
  getBalance,
  transferBalance,
} from '../controllers/account.controller.js';

const router = Router();

router.get('/balance', authMiddleware, getBalance);
router.post('/transfer', authMiddleware, transferBalance);

export default router;

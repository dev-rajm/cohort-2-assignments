import { Router } from 'express';
import { Card, User } from '../db';
import { cardSchema } from '../schema/types';
import userMiddleware from '../middlewares/user.middleware';

const router = Router();

router.get('/dashboard', userMiddleware, async (req, res) => {
  const user = await User.findOne(req.headers.username);
  const cards = await Card.find({
    _id: {
      $in: user.createdCards,
    },
  });

  res.status(200).json({
    cards: cards,
  });
});

export default router;

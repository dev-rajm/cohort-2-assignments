import { Router } from 'express';
import { Card, User } from '../db';
import { cardSchema } from '../schema/types';
import userMiddleware from '../middlewares/user.middleware';

const router = Router();

// Get all cards
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

// Create new card
router.post('/create', userMiddleware, async (req, res) => {
  const createPayload = req.body;
  const parsePayload = cardSchema.safeParse(createPayload);

  if (!parsePayload.success) {
    return res.status(411).json({
      message: 'Unable to create card.',
    });
  }

  const newCard = await Card.create({
    firstName: createPayload.firstName,
    lastName: createPayload.lastName,
    bio: createPayload.bio,
    interests: createPayload.interests,
    twitter: createPayload.twitter,
    instagram: createPayload.instagram,
    facebook: createPayload.facebook,
    youtube: createPayload.youtube,
    linkedIn: createPayload.linkedIn,
  });

  await User.updateOne(
    { username: req.headers.username },
    { $push: { createdCards: newCard._id } }
  );

  res.status(201).json({
    message: 'Card created successfully.',
  });
});

// Update existing card
router.put('/update/:id', userMiddleware, async (req, res) => {});

// Delete existing card
router.delete('/delete/:id', userMiddleware, async (req, res) => {
  const id = req.params.id;
  await Card.findByIdAndDelete(id);

  await User.findOneAndUpdate(
    { username: req.headers.username },
    {
      $pull: { createdCards: id },
    },
    { new: true }
  );

  res.status(200).json({
    message: 'Deleting card successfully.',
  });
});

export default router;

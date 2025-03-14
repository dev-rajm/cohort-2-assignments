import Card from '../models/card.model.js';
import User from '../models/user.model.js';
import { cardSchema } from '../schema/types.js';

// Get all cards
export const getCards = async (req, res) => {
  const user = await User.findOne({ username: req.username });
  const cards = await Card.find({
    _id: {
      $in: user.createdCards,
    },
  });

  res.status(200).json({
    cards: cards,
  });
};

// Create new card
export const createCard = async (req, res) => {
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
    { username: req.username },
    { $push: { createdCards: newCard._id } }
  );

  res.status(201).json({
    message: 'Card created successfully.',
  });
};

// Update an existing card
export const updateCard = async (req, res) => {
  const id = req.params.id;
  const isExist = await Card.findById(id);
  if (!isExist) {
    return res.status(404).json({
      message: "Card doesn't exist.",
    });
  }
  const createPayload = req.body;
  const parsePayload = cardSchema.safeParse(createPayload);
  if (!parsePayload.success) {
    return res.status(411).json({
      message: 'Unable to update card.',
    });
  }

  await Card.findByIdAndUpdate(
    { _id: id },
    {
      firstName: createPayload.firstName,
      lastName: createPayload.lastName,
      bio: createPayload.bio,
      interests: createPayload.interests,
      twitter: createPayload.twitter,
      instagram: createPayload.instagram,
      facebook: createPayload.facebook,
      youtube: createPayload.youtube,
      linkedIn: createPayload.linkedIn,
    },
    { new: true }
  );

  res.status(200).json({
    message: 'Updating card successfully',
  });
};

// Delete a card
export const deleteCard = async (req, res) => {
  const id = req.params.id;
  await Card.findByIdAndDelete(id);

  await User.findOneAndUpdate(
    { username: req.username },
    {
      $pull: { createdCards: id },
    },
    { new: true }
  );

  res.status(200).json({
    message: 'Deleting card successfully.',
  });
};

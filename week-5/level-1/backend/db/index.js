import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

mongoose.connect(process.env.MONGO_URL);

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  createdCards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Card',
    },
  ],
});

const CardSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  bio: String,
  interests: [
    {
      type: String,
    },
  ],
  links: [
    {
      type: String,
    },
  ],
});

export const User = mongoose.model('User', UserSchema);
export const Card = mongoose.model('card', CardSchema);

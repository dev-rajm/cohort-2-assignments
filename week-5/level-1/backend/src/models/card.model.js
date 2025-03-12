import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  bio: String,
  interests: [
    {
      type: String,
    },
  ],
  twitter: String,
  instagram: String,
  facebook: String,
  youtube: String,
  linkedIn: String,
});

const Card = mongoose.model('Card', CardSchema);

export default Card;

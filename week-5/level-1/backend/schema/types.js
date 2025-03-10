import { z } from 'zod';

export const userSchema = z.object({
  username: z.string().min(6),
  password: z.string().min(8),
  createdCards: z.array(z.string()).optional(),
});

export const cardSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  bio: z.string().optional(),
  interests: z.array(z.string()).optional(),
  twitter: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  youtube: z.string().optional(),
  linkedIn: z.string().optional(),
});

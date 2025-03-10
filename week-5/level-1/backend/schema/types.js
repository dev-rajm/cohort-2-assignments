import { z } from 'zod';

export const userSchema = z.object({
  username: z.string().min(6),
  password: z.string().min(8),
  createdCards: z.array(z.string()).optional(),
});

export const cardSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  bio: z.string(),
  interests: z.array(z.string()).optional(),
  links: z.array(z.string()).optional(),
});

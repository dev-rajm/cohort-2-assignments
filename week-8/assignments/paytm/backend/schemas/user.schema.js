import { z } from "zod";

export const signupSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().max(50),
  lastName: z.string().max(50),
});

export const signinSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

export const changePasswordSchema = z.object({
  password: z.string().min(6),
});

import { Router } from "express";
import {
  changePassword,
  signin,
  signup,
} from "../controllers/auth.controller.js";

const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.patch("/change-password", changePassword);

export default userRouter;

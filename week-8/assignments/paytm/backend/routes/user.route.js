import { Router } from "express";
import { signin, signup, updateUser } from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.put("/", authMiddleware, updateUser);

export default userRouter;

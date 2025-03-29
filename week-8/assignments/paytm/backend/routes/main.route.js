import { Router } from "express";
import userRouter from "./user.route.js";

const mainRoute = Router();

mainRoute.use("/user", userRouter);

export default mainRoute;

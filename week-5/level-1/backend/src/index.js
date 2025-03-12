import express from 'express';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import connectDB from './lib/db.js';
import userRouter from './routers/user.router.js';
import cardRouter from './routers/card.router.js';
import userMiddleware from './middlewares/user.middleware.js';

config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/card', userMiddleware, cardRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  connectDB();
});

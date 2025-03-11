import express from 'express';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import userRouter from './routers/user.router.js';
import cardRouter from './routers/card.router.js';

config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/card', cardRouter);

app.listen(port, err => {
  if (err) throw err;
  console.log(`Server is running on port: ${port}`);
});

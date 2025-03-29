import express from "express";
import { config } from "dotenv";
import mainRoute from "./routes/main.route.js";
import cors from "cors";
import { connectDB } from "./lib/db.js";

config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/v1/", mainRoute);

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server is running on port: ${port}`);
  connectDB();
});

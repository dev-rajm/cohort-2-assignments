import { config } from "dotenv";
config();

const JWT_SECRET = process.env.JWT_SECRET;

export default JWT_SECRET;

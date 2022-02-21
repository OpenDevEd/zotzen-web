import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();
const { JWT_SECRET } = process.env;

export const generateToken = (userinfo) => {
  const Issuetoken = jwt.sign(userinfo, JWT_SECRET, { expiresIn: "1d" });
  return Issuetoken;
};
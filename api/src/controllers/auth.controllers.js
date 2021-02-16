import passport from "passport";
import { generateToken } from "../helpers/token";
import loginActivity from "../database/models/login_activity";
import { config } from "dotenv";

config();
const { APP_FRONTEND_URL } = process.env;

export const callBack = async (req, res) => {
  try {
    const { user } = req;
    const payload = { userId: user._id, role: user.role };
    const token = await generateToken(payload);
    await loginActivity.create({ userId: user._id });
    return res.redirect(`${APP_FRONTEND_URL}/authorize/${token}`);
  } catch (error) {
    const { message, status = 400 } = error;
    return res.status(status).json({ message, statusCode: status });
  }
};

import passport from 'passport';
import { generateToken } from '../helpers/token';
import { config } from 'dotenv';

config();
const { APP_FRONTEND_URL } = process.env;

export const callBack = async (req, res) => {
  try {
    const { user } = req;
    const payload = { userId: user._id }
    const token = await generateToken(payload);
    return res.redirect(`${APP_FRONTEND_URL}/authorize/${token}`);
  } catch (error) {
    const { message, status = 400 } = error;
    return res.status(status).json({ message, statusCode: status });
  }
};

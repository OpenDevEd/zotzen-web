import passport from 'passport';
import { generateToken } from '../helpers/token';
import loginActivity from '../database/models/login_activity';
import { config } from 'dotenv';

config();
const { APP_FRONTEND_URL } = process.env;

export const callBack = async (req, res) => {
  try {
    const { user } = req;
    const payload = {
      userId: user._id,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      photo: user.profilePhotoURL,
    };
    const token = await generateToken(payload);
    await loginActivity.create({ userId: user._id });
    return res.redirect(`${APP_FRONTEND_URL}/authorize/${token}`);
  } catch (error) {
    const { message, status = 400 } = error;
    return res.status(status).json({ message, statusCode: status });
  }
};

export const loggedIn = async (req, res) => {
  try {
    const { user } = req;
    return res.status(200).json({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      photo: user.profilePhotoURL,
      role: user.role,
    });
  } catch (error) {
    const { message, status = 400 } = error;
    return res.status(status).json({ message, statusCode: status });
  }
};

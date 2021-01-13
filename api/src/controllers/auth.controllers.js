import passport from 'passport';
import { generateToken } from '../helpers/token';

export const callBack = async (req, res) => {
  try {
    const { user } = req;
    const payload = { userId: user._id }
    const token = await generateToken(payload);
    return res.status(200).json({ token, statusCode: 200 });
  } catch (error) {
    const { message, status = 400 } = error;
    return res.status(status).json({ message, statusCode: status });
  }
};

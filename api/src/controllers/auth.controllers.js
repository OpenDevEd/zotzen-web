import { User } from '../database/models';

export const login = async (req, res) => {
  try {
    return res.status(200).json({ message: 'Login' });
  } catch (error) {
    const { message, status = 400 } = error;
    return res.status(status).json({ message, statusCode: status });
  }
};

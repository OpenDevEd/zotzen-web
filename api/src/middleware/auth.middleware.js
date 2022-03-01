import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import User from '../database/models/user';

config();
const { JWT_SECRET } = process.env;

export const verifyToken = async (req, res, next) => {
  const token = req.headers['auth-access'];
  if (!token) {
    return res.status(401).send({ status: 401, error: 'No token was provided' });
  }
  try {
    const decoded = await jwt.verify(token, JWT_SECRET);
    const userInfo = await User.findById(decoded.userId);
    if (!userInfo) {
      return res.status(403).send({ status: 403, error: 'The token you provided is invalid' });
    }
    req.user = userInfo;
    next();
  } catch (error) {
    return res.status(400).send({ status: 400, error });
  }
  return true;
};

export const isAdmin = async (req, res, next) => {
  if (req.user.role !== 'Administrator') {
    return res.status(401).send({ status: 401, error: 'Unauthorized access' });
  }
  next();
  return true;
};
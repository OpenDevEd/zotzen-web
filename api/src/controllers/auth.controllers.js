import passport from 'passport';

export const callBack = async (req, res) => {
  try {
    const { user } = req;
    return res.status(200).json({ data: user, statusCode: 200 });
  } catch (error) {
    const { message, status = 400 } = error;
    return res.status(status).json({ message, statusCode: status });
  }
};

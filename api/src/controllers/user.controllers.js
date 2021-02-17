import User from "../database/models/user";
import loginActivity from "../database/models/login_activity";

const allRoles = ["Standard", "Administrator"];

export const listOfUsers = async (req, res) => {
  try {
    const users = await User.find();
    // let userData = [];
    // users.map(async (user) => {
    //   const loginHistory = await loginActivity.find({ userId: user._id });
    //   userData.push({ ...user, loginActivity: loginHistory });
    // });
    return res.status(200).json({ data: users, statusCode: 200 });
  } catch (error) {
    const { message, status = 400 } = error;
    return res.status(status).json({ message, statusCode: status });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!allRoles.includes(role)) {
      return res.status(422).json({
        message: `User roles should be: ${allRoles.join()}`,
        statusCode: 422,
      });
    }

    const userInfo = await User.findByIdAndUpdate(userId, { role });
    if (!userInfo) {
      return res
        .status(404)
        .json({ message: "User not found", statusCode: 404 });
    }
    return res.status(200).json({ user: userInfo, statusCode: 200 });
  } catch (error) {
    const { message, status = 400 } = error;
    return res.status(status).json({ message, statusCode: status });
  }
};

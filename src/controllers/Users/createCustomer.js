import bcryptjs from 'bcryptjs';
import User from '../../models/User.js';
import { sendResponse } from '../../utils/responseHelper.js';
import { exclude } from '../../utils/exclude.js';

export const register = async(req, res, next) => {
  try {
    const { full_name,email, password,phone } = req.body;

    const hashedPassword = await bcryptjs.hash(password, 10);

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser){
      return sendResponse(res, 400,false,'User already exist');
    }

    const user = await User.create({
      full_name,
      phone,
      email,
      password: hashedPassword,
    });

    const user_obj = exclude(user.toJSON(), ['password']);

    sendResponse(res, 201, true, 'User created successfully', user_obj);
  } catch (error) {
    next(error);
  }
};

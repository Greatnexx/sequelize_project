import bcrypt from 'bcryptjs';
import User from '../../models/User.js';
import redisClient from '../../config/redis.js';
import { sendResponse } from '../../utils/responseHelper.js';
import { exclude } from '../../utils/exclude.js';
import generateToken from '../../utils/generateToken.js';

export const login = async(req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return sendResponse(res, 401, false, 'Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendResponse(res, 401, false, 'Invalid credentials');
    }

    const token = generateToken(user.id);

   const redis_key = `auth_token:${user.id}`;


    await redisClient.set(redis_key, token, {
      EX: parseInt(process.env.EXP_TIME),
    });

     const user_obj = exclude(user.toJSON(), ['password']);

    sendResponse(res, 200, true, 'Login successful', {token, user: user_obj });
  } catch (error) {
    next(error);
  }
};

import jwt from 'jsonwebtoken';
import redisClient from '../config/redis.js';
import User from '../models/User.js';

const protect = async(req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.userId;

      // Check Redis token
      const redisToken = await redisClient.get(`token:${userId}`);
      if (!redisToken || redisToken !== token) {
        return res.status(401).json({
          error: 'Invalid or expired token',
        });
      }

      // Fetch user from database
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({
          error: 'User not found',
        });
      }

      req.user = user;
      return next();

    } catch (error) {
      next(error);

    }
  }

  return res.status(401).json({
    error: 'Not authorized, no token',
  });
};

export { protect };

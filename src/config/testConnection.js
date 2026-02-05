import sequelize from './database.js';
import redisClient from './redis.js';

export const testConnections = async () => {
  try {
    // Test PostgreSQL
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connected');
    
    // Test Redis
    await redisClient.connect();
    console.log('✅ Redis connected');
    
    return true;
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    return false;
  }
};
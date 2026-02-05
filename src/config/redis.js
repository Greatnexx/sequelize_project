import redis from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const client = redis.createClient({
  host: 'localhost',
  port: 6379
});

client.on('error', (err) => console.log('Redis Client Error', err));

export default client;
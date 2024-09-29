const redis = require('redis');
const config = require('../config');

const redisConfig = config.redis;

let client = null;

// const client = redis.createClient({
//   url: `redis://${redisConfig.host}:${redisConfig.port}`,
//   legacyMode: true, // Enable legacy mode for backward compatibility
// });

// let isRedisConnected = false;

// client.connect().catch((err) => {
//   console.error('Redis connection error:', err);
// });

// client.on('error', (err) => {
//   console.error('Redis error:', err);
//   isRedisConnected = false;
// });

// client.on('ready', () => {
//   console.log('Redis client connected');
//   isRedisConnected = true;
// });

const getAsync = async (key) => {
  // if (!isRedisConnected) {
  //   console.warn('Skipping Redis GET operation as Redis is not connected');
  //   return null;
  // }
  // return client.v4.get(key);
  return null; 
};

const setexAsync = async (key, ttl, value) => {
  // if (!isRedisConnected) {
  //   console.warn('Skipping Redis SETEX operation as Redis is not connected');
  //   return null;
  // }
  // return client.v4.setEx(key, ttl, value);
  return null;
};

module.exports = {
  client,
  getAsync,
  setexAsync,
};
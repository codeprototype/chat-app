
import redis from 'ioredis'
import config from "../config/redisConfig.js"
const RedisClient = new redis.Redis(config.redis_url);
 
export default RedisClient;

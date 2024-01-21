import Redis from 'ioredis';

const runtimeConfig = useRuntimeConfig();
const redis = new Redis({ host: runtimeConfig.redisHost });

export default defineEventHandler(async (event) => {
  return {
    shortens: await redis.get(`shorten:count`),
  };
});

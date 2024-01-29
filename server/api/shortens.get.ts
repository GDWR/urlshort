import Redis from 'ioredis';

const runtimeConfig = useRuntimeConfig();
const redis = new Redis({ host: runtimeConfig.redisHost });

export default defineEventHandler(async (event) => {
  var shortenIds =  await redis.keys("shorten:*")
  var shortens = []
  for (let id of shortenIds){
      shortens.push(id.slice(8))
  }

  return {
    count: await redis.get(`shorten_count`),
    shortens: shortens
  };
});

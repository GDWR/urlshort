import { z } from 'zod';
import uniqid from 'uniqid';
import Redis from 'ioredis';


const runtimeConfig = useRuntimeConfig();
const redis = new Redis({ host: runtimeConfig.redisHost });
const shortenScheme = z.object({
  id: z.string(),
});


export default defineEventHandler(async (event) => {
  const result = await getValidatedQuery(event, query => shortenScheme.safeParse(query));

  if (!result.success) {
    setResponseStatus(event, 422);
    return {
      error: result.error.issues,
    };
  }

  const { id } = result.data;  
  var url = await redis.get(`shorten:${id}`);

  if (!url) {
    setResponseStatus(event, 404);
    return;
  }

  return {
    url: url,
  }
})
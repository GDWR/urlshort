import { z } from 'zod';
import uniqid from 'uniqid';
import Redis from 'ioredis';

const runtimeConfig = useRuntimeConfig();
const redis = new Redis({ host: runtimeConfig.redisHost });
const shortenScheme = z.object({
  url: z.string().url().startsWith("https://"),
});


export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, body => shortenScheme.safeParse(body));

  if (!result.success) {
    setResponseStatus(event, 422);
    return {
      error: result.error.issues,
    };
  }

  const { url } = result.data;
  const id = uniqid();
  
  await redis.set(`shorten:${id}`, url);
  var shortens = await redis.incr(`shorten:count`);
  await redis.publish(`shorten`, JSON.stringify({ shortens: shortens }));

  return {
    url: `${runtimeConfig.public.baseUrl}/url/${id}`,
  }
})
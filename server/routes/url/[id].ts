import Redis from 'ioredis';

const redis = new Redis();
const runtimeConfig = useRuntimeConfig();


export default defineEventHandler(async (event) => {
    
    const id = getRouterParam(event, 'id');
    if (!id) {
        await sendRedirect(event, runtimeConfig.public.baseUrl, 302);
    }

    const url = await redis.get(`shorten:${id}`);

    if (!url) {
        await sendRedirect(event, runtimeConfig.public.baseUrl, 302);
    }

    await sendRedirect(event, url!, 302);
  })
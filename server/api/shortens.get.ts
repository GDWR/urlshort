import Redis from 'ioredis';

const runtimeConfig = useRuntimeConfig();
const redis = new Redis({ host: runtimeConfig.redisHost });
const subRedis = new Redis({ host: runtimeConfig.redisHost });

export default defineEventHandler(async (event) => {
    setHeader(event, 'cache-control', 'no-cache');
    setHeader(event, 'connection', 'keep-alive');
    setHeader(event, 'content-type', 'text/event-stream');
    setResponseStatus(event, 200);

    let counter = 0

    const sendEvent = (data: any) => {
      event.node.res.write(`id: ${++counter}\n`);
      event.node.res.write(`data: ${JSON.stringify(data)}\n\n`);
    }
    
    await subRedis.subscribe('shorten');
    sendEvent({ shortens: await redis.get(`shorten:count`) });

    subRedis.on("message", (_, message) => {
        var data = JSON.parse(message);
        sendEvent({ shortens: data.shortens });
      });

    event._handled = true;
})
import koaRouter from 'koa-router';
export const healthRouter = new koaRouter();

healthRouter.get('/health', async (ctx) => {
    ctx.body = {
        status: 'success',
        message: 'hello, world!'
    };
});

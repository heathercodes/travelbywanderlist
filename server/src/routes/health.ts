const Router = require('koa-router');
// const healthController = require('../controllers/health');

export const router = new Router();

router.get('/', async (ctx, next) => {
    ctx.body = 'Hello World'
});

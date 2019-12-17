import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import Koa from 'koa';
import dotenv from 'dotenv';
import { healthRouter } from './routes/health';

dotenv.config();
const PORT = 9000;

const app = new Koa();
app.use(bodyParser())
app.use(cors());
app.use(healthRouter.routes());
app.use(healthRouter.allowedMethods());

const server = app.listen(PORT, () => {
    console.info(`Server started on port ${PORT}`);
});

export default server;

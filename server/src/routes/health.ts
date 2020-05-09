import { Router, Response } from 'express';

const healthRouter = Router();

healthRouter.get('', (_, res: Response) => {
    res.send('health check OK');
});

export { healthRouter };

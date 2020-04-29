import { Router, Request, Response } from 'express';
const healthRouter = Router();

healthRouter.get('/health', (req: Request, res: Response) => {
    res.send('health check OK')
});

export { healthRouter };

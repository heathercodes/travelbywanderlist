import { Router, Response } from 'express';

const healthRouter = Router();

healthRouter.get('', (_, res: Response) => {
    res.json({ message: 'health check OK' });
});

export { healthRouter };

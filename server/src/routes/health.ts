import { Router, Request, Response } from 'express';
const router = Router();

router.get('/health', (req: Request, res: Response) => {
    res.send('health check OK')
});

export { router }

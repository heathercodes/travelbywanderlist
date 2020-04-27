import { Router, Request, Response } from 'express';
import { fetchImageByLocation } from '../service/search';
const router = Router();

router.get('/images', (req: Request, res: Response) => {
    res.send('images')
});

export { router };
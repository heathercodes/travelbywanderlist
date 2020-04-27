import { Router } from 'express';
import { healthRouter } from './health';
import { imageRouter } from '../images';

const router = Router();

router.use('/', healthRouter);
router.use('/images', imageRouter);

export { router };

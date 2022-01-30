import { Router } from 'express';
import { healthRouter } from './health';
import { locationRouter } from './location';
import { collectionRouter } from './collection';
import { authRouter } from './auth';
import { errorHandler } from './error';
import { secureRouter } from './secure';

const router = Router();

// app.use('/api', protect)
router.use('/api/health', healthRouter);
router.use('/api/location', locationRouter);
router.use('/api/collection', collectionRouter);
router.use('/user', authRouter);

router.all('*', errorHandler);

export { router, secureRouter };

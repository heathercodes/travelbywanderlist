import { Router } from 'express';
import { healthRouter } from './health';
import { locationRouter } from './location';
import { collectionRouter } from './collection';
import { userRouter } from './user';
import { errorHandler } from './error';

const router = Router();

// app.use('/api', protect)
router.use('/api/health', healthRouter);
router.use('/api/location', locationRouter);
router.use('/api/collection', collectionRouter);
router.use('/api/login', userRouter);
router.use('/api/signin', userRouter);

router.all('*', errorHandler);

export { router };

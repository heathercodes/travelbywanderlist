import { Router } from 'express';
import { healthRouter } from './health';
import { locationRouter } from './location';
import { collectionRouter } from './collection';
import { errorHandler } from './error';

const router = Router();

router.use('/health', healthRouter);
router.use('/location', locationRouter);
router.use('/collection', collectionRouter);
router.get('/test', async (_, res) => {
    res.json({ message: 'pass!' });
});

router.all('*', errorHandler);

export { router };

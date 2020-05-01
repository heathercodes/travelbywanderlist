import { Router } from 'express';
import { healthRouter } from './health';
import { locationRouter } from './location';
import { collectionRouter } from './collection';

const router = Router();

router.use('/health', healthRouter);
router.use('/location', locationRouter);
router.use('/collection', collectionRouter);

export { router };

import { Router } from 'express';
import { healthRouter } from './health';
import { locationRouter } from './location';
import { collectionRouter } from './collection';

const router = Router();

router.use('/health', healthRouter);
router.use('/location', locationRouter);
router.use('/collection', collectionRouter);

router.all('*', (req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl} on this server!`);
    err.status = 'fail';
    err.statusCode = 404;

    next(err);
});

export { router };

import { logger } from '../utils/logger';

export const errorHandler = (err: any, _: any, res: any, next: any): void => {
    logger.error(err.message);
    if (process.env.NODE_ENV !== 'production') {
        logger.error(err.stack);
    }

    if (!err.statusCode) err.statusCode = 500; // eslint-disable-line

    res.status(err.statusCode).json({
        error: err.message
    });

    next(err);
};

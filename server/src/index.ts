import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import { router, secureRouter } from './routes';
import { logger } from './utils/logger';
// import { protect } from './utils/auth';

require('./utils/auth')(passport); // eslint-disable-line

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    morgan('combined', {
        stream: {
            write: (message: string): void => {
                logger.info(message);
            }
        }
    })
);

app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions

app.use(router);
app.use('/map/:id', passport.authenticate('jwt', { session: false }), secureRouter);
// app.use('/api', protect);

export { app };

import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import { router } from './routes';
import { logger } from './utils/logger';

const app = express();

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
app.use(router);

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use('*', (err: any, _: any, res: any): void => {
        res.status(err.status || 500);
        res.render('error.ejs', {
            message: err.message,
            error: err
        });
    });
}

// // production error handler
// // no stacktraces leaked to user
app.use('*', (err: any, _: any, res: any): void => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

export { app };

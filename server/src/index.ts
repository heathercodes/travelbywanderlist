import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { router } from './routes';
import { logger } from './utils/logger';

dotenv.config();
const PORT = 9000;
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

// app.use((err, req, res) => {
//     err.statusCode = err.statusCode || 500;
//     err.status = err.status || 'error';

//     res.status(err.statusCode).json({
//         status: err.status,
//         message: err.message
//     });
// });

const server = app.listen(PORT, () => {
    console.info(`Server started on port ${PORT}`);
});

export { app };
export default server;

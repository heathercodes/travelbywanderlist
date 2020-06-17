import express from 'express';
import dotenv from 'dotenv';
import { router } from './routes';

dotenv.config();
const PORT = 9000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.use((err, req, res) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});

const server = app.listen(PORT, () => {
    console.info(`Server started on port ${PORT}`);
});

export default server;

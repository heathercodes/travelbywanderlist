import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { router } from './routes/health';

dotenv.config();
const PORT = 9000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

const server = app.listen(PORT, () => {
    console.info(`Server started on port ${PORT}`);
});

export default server;

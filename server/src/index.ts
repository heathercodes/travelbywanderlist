import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { router } from './routes';

dotenv.config();
const PORT = 9000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client')));
app.use(router);

const server = app.listen(PORT, () => {
    console.info(`Server started on port ${PORT}`);
});

export default server;

import { app } from './index';

const PORT = 9000;

const server = app.listen(PORT, () => {
    console.info(`Server started on port ${PORT}`);
});

export default server;

import { db } from '../db';

const setup = async () => {
    await db.migrate.latest();
    // await db.seed();
    await db.destroy();
};

module.exports = setup;

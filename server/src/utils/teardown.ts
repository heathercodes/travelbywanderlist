import { db } from '../db';

const teardown = async () => {
    await db.migrate.rollback();
    await db.destroy();
};

module.exports = teardown;

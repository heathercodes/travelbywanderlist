// @ts-nocheck
import { db } from '../db';

const teardown = async (): Promise<void> => {
    await db.migrate.rollback();
    await db.destroy();
};

module.exports = teardown;

// @ts-nocheck
import { db } from '../db';

const setup = async (): Promise<void> => {
    await db.migrate.latest();
    await db.destroy();
};

module.exports = setup;

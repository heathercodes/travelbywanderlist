import request from 'supertest';
import { db } from '../../db';
import server from '../../index';

describe('health routes', () => {
    beforeAll(async (done) => {
        await db.migrate.latest();
        await db.seed.run();
        done();
    });
    afterAll(async (done) => {
        await db.migrate.rollback().then(() => db.destroy());
        server.close();
        done();
    });
    it('gets the health endpoint', async (done) => {
        const response = await request(server).get('/health');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('health check OK');
        done();
    });
});

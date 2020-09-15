import request from 'supertest';
import { db } from '../../db';
import server from '../../index';

describe('test', () => {
    beforeAll(async (done) => {
        await db.migrate.latest();
        done();
    });
    afterAll(async (done) => {
        await db.destroy();
        server.close();
        done();
    });
    it('gets the test endpoint', async (done) => {
        const response = await request(server).get('/test');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('pass!');
        done();
    });
});

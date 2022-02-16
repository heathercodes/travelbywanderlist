// @ts-nocheck
import request from 'supertest';
import { app as server } from '../../index';

describe('health routes', () => {
    it('gets the health endpoint', async (done) => {
        const response = await request(server).get('/api/health');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('health check OK');
        done();
    });
});

// @ts-nocheck
import request from 'supertest';
import { app as server } from '../../index';

const requestBody = {
    name: 'Portland',
    latitude: '3454',
    longitude: '787',
    description: 'Great place',
    image_url: 'url'
};

describe('location routes', () => {
    let baseResponse;

    it('POST /location create a location', async () => {
        baseResponse = await request(server)
            .post('/api/location')
            .send({ ...requestBody, wanderlist_id: 3 });

        expect(baseResponse.status).toBe(201);
        expect(baseResponse.body.data).toStrictEqual({
            id: expect.any(Number),
            description: expect.any(String),
            name: expect.any(String),
            image_url: expect.any(String),
            wanderlist_id: expect.any(Number),
            latitude: expect.any(Number),
            longitude: expect.any(Number)
        });
    });

    it('GET /location get a location by ID', async () => {
        const response = await request(server).get(`/api/location/${baseResponse.body.data.id}`);

        expect(response.status).toBe(200);
        expect(response.body.data).toStrictEqual({
            id: expect.any(Number),
            description: expect.any(String),
            name: expect.any(String),
            image_url: expect.any(String),
            wanderlist_id: expect.any(Number),
            latitude: expect.any(Number),
            longitude: expect.any(Number)
        });

        // done();
    });

    it('DELETE /location deletes a location', async () => {
        const response = await request(server).delete(`/api/location/${baseResponse.body.data.id}`);

        expect(response.status).toBe(200);
        expect(response.body.data).toStrictEqual({
            message: 'Location deleted',
            id: baseResponse.body.data.id
        });

        // done();
    });
});

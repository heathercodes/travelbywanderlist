// @ts-nocheck
import request from 'supertest';
import { app as server } from '../../index';
import { db } from '../../db';

const requestBody = {
    name: 'Portland',
    latitude: '3454',
    longitude: '787',
    description: 'Great place',
    image_url: 'url'
};

describe('location routes', () => {
    beforeAll(async () => {
        await db.migrate.latest();
        await db.seed.run();
    });
    afterAll(async () => {
        await db.destroy();
    });

    it('POST /location create a location', async () => {
        const response = await request(server)
            .post('/api/location')
            .send({ ...requestBody, wanderlist_id: 2 });
        console.log(response);
        expect(response.status).toBe(201);
        expect(response.body.data).toStrictEqual({
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
        const locationResponse = await request(server)
            .post('/api/location')
            .send({ ...requestBody, wanderlist_id: 2 });

        const response = await request(server).get(
            `/api/location/${locationResponse.body.data.id}`
        );
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
    });

    it('DELETE /location deletes a location', async () => {
        const locationResponse = await request(server)
            .post('/api/location')
            .send({ ...requestBody, wanderlist_id: 1 });
        const response = await request(server).delete(
            `/api/location/${locationResponse.body.data.id}`
        );

        expect(response.status).toBe(200);
        expect(response.body.data).toStrictEqual({
            message: 'Location deleted',
            id: locationResponse.body.data.id
        });
    });
});

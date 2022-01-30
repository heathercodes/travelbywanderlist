// @ts-nocheck
import request from 'supertest';
import { app as server } from '../../index';
// import { db } from '../../db';

const requestBody = {
    name: 'Portland',
    latitude: '3454',
    longitude: '787',
    description: 'Great place',
    image_url: 'url'
};

const collectionBody = {
    name: 'Colorado',
    id: 123
};

describe('location routes', () => {
    it('POST /location create a location', async (done) => {
        try {
            const collectionResp = await request(server)
                .post('/api/collection')
                .send(collectionBody);

            const response = await request(server)
                .post('/api/location')
                .send({ ...requestBody, wanderlist_id: collectionResp.body.data.collection.id });

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
            done();
        } catch (err) {
            throw err;
        }
    });

    it('GET /location get a location by ID', async (done) => {
        try {
            const collectionResp = await request(server)
                .post('/api/collection')
                .send(collectionBody);
            const locationResponse = await request(server)
                .post('/api/location')
                .send({ ...requestBody, wanderlist_id: collectionResp.body.data.collection.id });

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
            done();
        } catch (err) {
            throw err;
        }
    });

    it('DELETE /location deletes a location', async (done) => {
        try {
            const collectionResp = await request(server)
                .post('/api/collection')
                .send(collectionBody);
            const locationResponse = await request(server)
                .post('/api/location')
                .send({ ...requestBody, wanderlist_id: collectionResp.body.data.collection.id });
            const response = await request(server).delete(
                `/api/location/${locationResponse.body.data.id}`
            );

            expect(response.status).toBe(200);
            expect(response.body.data).toStrictEqual({
                message: 'Location deleted',
                id: locationResponse.body.data.id
            });
            done();
        } catch (err) {
            throw err;
        }
    });
});

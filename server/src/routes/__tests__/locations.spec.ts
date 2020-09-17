import request from 'supertest';
import { db } from '../../db';
import server from '../../index';

const requestBody = {
    name: 'Portland',
    latitude: '3454',
    longitude: '787',
    description: 'Great place',
    image_url: 'url'
};

describe('location routes', () => {
    beforeAll(async (done) => {
        await db.migrate.latest();
        done();
    });
    afterAll(async (done) => {
        await db.migrate.rollback().then(() => db.destroy());
        server.close();
        done();
    });

    it('POST /location create a location', async (done) => {
        const response = await request(server).post('/location').send(requestBody);
        expect(response.status).toBe(200);
        expect(response.body.data).toStrictEqual({
            id: expect.any(Number),
            description: expect.any(String),
            name: expect.any(String),
            image_url: expect.any(String),
            wanderlist_id: null,
            latitude: expect.any(Number),
            longitude: expect.any(Number)
        });
        done();
    });

    it('GET /location get a location by ID', async (done) => {
        const locationResponse = await request(server).post('/location').send(requestBody);
        const response = await request(server).get(`/location/${locationResponse.body.data.id}`);
        expect(response.status).toBe(200);
        expect(response.body.data).toStrictEqual({
            id: expect.any(Number),
            description: expect.any(String),
            name: expect.any(String),
            image_url: expect.any(String),
            wanderlist_id: null,
            latitude: expect.any(Number),
            longitude: expect.any(Number)
        });
        done();
    });

    it('DELETE /location deletes a location', async (done) => {
        const locationResponse = await request(server).post('/location').send(requestBody);
        const response = await request(server).delete(`/location/${locationResponse.body.data.id}`);
        expect(response.status).toBe(200);
        expect(response.body.data).toStrictEqual({
            message: 'Location deleted',
            id: locationResponse.body.data.id
        });
        done();
    });

    it('UPDATE /location updates a location', async (done) => {
        const locationResponse = await request(server).post('/location').send(requestBody);
        const updateBody = {
            description: 'middling place at best',
            id: locationResponse.body.data.id
        };
        const response = await request(server)
            .put(`/location/${locationResponse.body.data.id}`)
            .send(updateBody);
        expect(response.status).toBe(200);
        expect(response.body.data).toStrictEqual({
            id: locationResponse.body.data.id,
            description: 'middling place at best',
            name: 'Portland',
            image_url: 'url',
            wanderlist_id: null,
            latitude: 3454,
            longitude: 787
        });
        done();
    });
});

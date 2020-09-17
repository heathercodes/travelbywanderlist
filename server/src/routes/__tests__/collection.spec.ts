import request from 'supertest';
import { db } from '../../db';
import server from '../../index';

const requestBody = {
    collection: {
        id: 6,
        name: 'Korea'
    },
    locations: [
        {
            id: '123',
            name: 'Seoul',
            latitude: '213',
            longitude: '12312',
            description: 'Great place',
            image_url: 'url',
            wanderlist_id: 6
        },
        {
            id: '2123',
            name: 'Seoul2',
            latitude: '213',
            longitude: '12312',
            description: 'Great place',
            image_url: 'url',
            wanderlist_id: 6
        }
    ]
};

describe('collection routes', () => {
    beforeAll(async (done) => {
        await db.migrate.latest();
        done();
    });
    afterAll(async (done) => {
        await db.migrate.rollback().then(() => db.destroy());
        server.close();
        done();
    });

    it('POST /collection create a collection', async (done) => {
        const response = await request(server).post('/collection').send(requestBody);
        expect(response.status).toBe(200);
        expect(response.body.data).toStrictEqual({
            collection: {
                id: expect.any(Number),
                name: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                user_id: null
            },
            locations: [
                {
                    id: expect.any(Number),
                    description: expect.any(String),
                    name: expect.any(String),
                    image_url: expect.any(String),
                    wanderlist_id: expect.any(Number),
                    latitude: expect.any(Number),
                    longitude: expect.any(Number)
                },
                {
                    id: expect.any(Number),
                    description: expect.any(String),
                    name: expect.any(String),
                    image_url: expect.any(String),
                    wanderlist_id: expect.any(Number),
                    latitude: expect.any(Number),
                    longitude: expect.any(Number)
                }
            ]
        });
        done();
    });

    it('GET /collection get a collection', async (done) => {
        await request(server).post('/collection').send(requestBody);
        const response = await request(server).get('/collection/6');
        expect(response.status).toBe(200);
        expect(response.body.data).toStrictEqual({
            collection: {
                id: expect.any(Number),
                name: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                user_id: null
            },
            locations: [
                {
                    id: expect.any(Number),
                    description: expect.any(String),
                    name: expect.any(String),
                    image_url: expect.any(String),
                    wanderlist_id: expect.any(Number),
                    latitude: expect.any(Number),
                    longitude: expect.any(Number)
                },
                {
                    id: expect.any(Number),
                    description: expect.any(String),
                    name: expect.any(String),
                    image_url: expect.any(String),
                    wanderlist_id: expect.any(Number),
                    latitude: expect.any(Number),
                    longitude: expect.any(Number)
                }
            ]
        });
        done();
    });

    it('DELETE /collection deletes a collection', async (done) => {
        await request(server).post('/collection').send(requestBody);
        const response = await request(server).delete('/collection/6');
        expect(response.status).toBe(200);
        expect(response.body.data).toStrictEqual({ id: 6, message: 'Wanderlist deleted' });
        done();
    });

    it('UPDATE /collection updates a collection', async (done) => {
        const updateBody = {
            collection: {
                name: 'South Korea',
                id: 6
            },
            locations: [
                {
                    id: '123',
                    description: 'an ok place',
                    image_url: 'url.com'
                }
            ]
        };
        await request(server).post('/collection').send(requestBody);
        const response = await request(server).put('/collection').send(updateBody);
        expect(response.status).toBe(200);
        expect(response.body.data).toStrictEqual({
            collection: {
                id: 6,
                name: 'South Korea',
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                user_id: null
            },
            locations: [
                {
                    id: 123,
                    description: 'an ok place',
                    name: 'Seoul',
                    image_url: 'url.com',
                    wanderlist_id: 6,
                    latitude: 213,
                    longitude: 12312
                }
            ]
        });
        done();
    });
});

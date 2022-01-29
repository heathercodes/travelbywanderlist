// @ts-nocheck
import request from 'supertest';
import { db } from '../../db';
import { app as server } from '../../index';

const requestBody = {
    collection: {
        name: 'Korea'
    },
    locations: [
        {
            name: 'Seoul',
            latitude: '213',
            longitude: '12312',
            description: 'Great place',
            image_url: 'url'
        },
        {
            name: 'Seoul2',
            latitude: '213',
            longitude: '12312',
            description: 'Great place',
            image_url: 'url'
        }
    ]
};

describe('collection routes', () => {
    beforeAll(async (done) => {
        await db.migrate.latest();
        await db.seed.run();
        done();
    });
    afterAll(async (done) => {
        await db.destroy();
        done();
    });

    it('POST /collection create a collection', async (done) => {
        const response = await request(server).post('/api/collection').send(requestBody);

        expect(response.status).toBe(201);
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
        const collectionResp = await request(server).post('/api/collection').send(requestBody);
        const response = await request(server).get(
            `/api/collection/${collectionResp.body.data.collection.id}`
        );

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
        const collectionResp = await request(server).post('/api/collection').send(requestBody);

        const response = await request(server).delete(
            `/api/collection/${collectionResp.body.data.collection.id}`
        );

        expect(response.status).toBe(200);
        expect(response.body.data).toStrictEqual({
            id: collectionResp.body.data.collection.id,
            message: 'Wanderlist deleted'
        });
        done();
    });

    it('UPDATE /collection updates a collection', async (done) => {
        const collectionResp = await request(server).post('/api/collection').send(requestBody);

        const updateBody = {
            collection: {
                name: 'South Korea',
                id: collectionResp.body.data.collection.id
            },
            locations: [
                {
                    id: collectionResp.body.data.locations[0].id,
                    description: 'an ok place',
                    image_url: 'url.com'
                }
            ]
        };
        const response = await request(server).put('/api/collection').send(updateBody);

        expect(response.status).toBe(201);
        expect(response.body.data).toStrictEqual({
            collection: {
                id: collectionResp.body.data.collection.id,
                name: 'South Korea',
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                user_id: null
            },
            locations: [
                {
                    id: collectionResp.body.data.locations[0].id,
                    description: 'an ok place',
                    name: 'Seoul',
                    image_url: 'url.com',
                    wanderlist_id: collectionResp.body.data.collection.id,
                    latitude: 213,
                    longitude: 12312
                }
            ]
        });
        done();
    });
});

// @ts-nocheck
import request from 'supertest';
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
    beforeAll(() => {
        jest.resetModules();
    });

    let baseResponse;

    it('POST /collection create a collection', async () => {
        baseResponse = await request(server)
            .post('/api/collection')
            .send({ ...requestBody, user: { id: 1 } });

        expect(baseResponse.status).toBe(201);
        expect(baseResponse.body.data).toStrictEqual({
            collection: {
                id: expect.any(Number),
                name: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                user_id: 1
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
    });

    it('GET /collection get a collection', async () => {
        const response = await request(server).get(
            `/api/collection/${baseResponse.body.data.collection.id}`
        );

        expect(response.status).toBe(200);
        expect(response.body.data).toStrictEqual({
            collection: {
                id: expect.any(Number),
                name: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                user_id: expect.any(Number)
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
    });

    it('DELETE /collection deletes a collection', async () => {
        const response = await request(server).delete('/api/collection/2');

        expect(response.status).toBe(200);
        expect(response.body.data).toStrictEqual({
            id: 2,
            message: 'Wanderlist deleted'
        });
    });

    it('UPDATE /collection updates a collection', async () => {
        const updateBody = {
            collection: {
                name: 'South Korea',
                id: baseResponse.body.data.collection.id
            },
            locations: [
                {
                    id: baseResponse.body.data.locations[0].id,
                    description: 'an ok place',
                    image_url: 'url.com'
                }
            ]
        };
        const response = await request(server)
            .put(`/api/collection/${baseResponse.body.data.collection.id}`)
            .send(updateBody);

        expect(response.status).toBe(201);
        expect(response.body.data).toStrictEqual({
            collection: {
                id: baseResponse.body.data.collection.id,
                name: 'South Korea',
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                user_id: 1
            },
            locations: [
                {
                    id: baseResponse.body.data.locations[0].id,
                    description: 'an ok place',
                    name: 'Seoul',
                    image_url: 'url.com',
                    wanderlist_id: baseResponse.body.data.collection.id,
                    latitude: 213,
                    longitude: 12312
                }
            ]
        });
    });
});

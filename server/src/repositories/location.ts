import { db } from '../db';
import { QueryResult } from 'pg';

export async function createLocation(data) {
    const results: QueryResult = await db('locations').insert({
        name: data.name,
        latitude: data.lat,
        longitude: data.lng,
    }).returning('id');

    if (results.length !== 1) {
        return null;
    }

    const result = results[0];

    return result;
}

export async function getLocationById(data) {
    const results: QueryResult = await db('locations').where('id', data.id);

    if (results.length !== 1) {
        return null;
    }

    const result = results[0];

    return result;
}

export async function updateLocation(data) {
    const results: QueryResult = await db('locations')
        .where('id', data.id)
        .update({ ...data.details })
        .returning('*');

    if (results.length !== 1) {
        return null;
    }

    const result = results[0];

    return result;
}

export async function deleteLocation(data) {
    const result: QueryResult = await db('locations')
        .where('id', data.id)
        .del()

    if (result !== 1) {
        return null;
    }

    return result;
}
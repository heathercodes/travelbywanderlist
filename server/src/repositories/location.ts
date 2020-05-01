import { QueryResult } from 'pg';
import { Location } from '../models';
import { db } from '../db';

export async function createLocation(data): Promise<number> {
    const results: QueryResult = await db('locations').insert(data).returning('id');

    if (results.length !== 1) {
        return null;
    }

    const result = results[0];

    return result;
}

export async function getLocationById(data): Promise<Location> {
    const results: QueryResult = await db('locations').where('id', data.id);

    if (results.length !== 1) {
        return null;
    }

    const result = results[0];

    return result;
}

export async function updateLocation(data): Promise<Location> {
    const results: QueryResult = await db('locations')
        .where('id', data.id)
        .update({ ...data })
        .returning('*');

    if (results.length !== 1) {
        return null;
    }

    const result = results[0];

    return result;
}

export async function deleteLocationById(data): Promise<number> {
    const result: QueryResult = await db('locations')
        .where('id', data.id)
        .del();

    if (result !== 1) {
        return null;
    }

    return result;
}

export async function deleteLocationByCollectionId(data): Promise<number> {
    const result: QueryResult = await db('locations')
        .where('wanderlist_id', data.id)
        .del();

    if (result !== 1) {
        return null;
    }

    return result;
}

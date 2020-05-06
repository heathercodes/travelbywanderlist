import { QueryResult } from 'pg';
import { Location } from '../models';
import { db } from '../db';

export async function createLocation(data): Promise<number | null> {
    const results: QueryResult = await db('locations').insert(data).returning('*');

    if (results.length === 0) {
        return null;
    }

    const result = results[0];

    return result;
}

export async function getLocationById(data): Promise<Location | void> {
    const results: QueryResult = await db('locations').where('id', data.id);

    if (results.length === 0) {
        return null;
    }

    const result = results[0];

    return result;
}

export async function getLocationsByCollectionId(data): Promise<Location[] | void> {
    const results: QueryResult = await db('locations')
        .where('wanderlist_id', data.id);

    if (results.length === 0) {
        return null;
    }

    return results;
}


export async function updateLocation(data): Promise<Location | null> {
    const results: QueryResult = await db('locations')
        .where('id', data.id)
        .update({ ...data })
        .returning('*');

    if (results.length === 0) {
        return null;
    }

    const result = results[0];

    return result;
}

export async function deleteLocationById(data): Promise<number | null> {
    const result: QueryResult = await db('locations')
        .where('id', data.id)
        .del();

    if (result === 0) {
        return null;
    }

    return result;
}

export async function deleteLocationByCollectionId(data): Promise<number | null> {
    const result: QueryResult = await db('locations')
        .where('wanderlist_id', data.id)
        .del();

    if (result === 0) {
        return null;
    }

    return result;
}

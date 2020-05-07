import { QueryResult } from 'pg';
import { Collection } from '../models';
import { db } from '../db';

export async function createCollection(data): Promise<Collection> {
    const results: QueryResult = await db('wanderlists').insert(data).returning('*');

    if (results.length !== 1) {
        return null;
    }

    const result = results[0];

    return result;
}

export async function getCollectionById(data): Promise<Collection> {
    const results: QueryResult = await db('wanderlists').where('id', data.id);

    if (results.length !== 1) {
        return null;
    }

    const result = results[0];

    return result;
}

export async function updateCollection(data): Promise<Collection> {
    const { id } = data;

    const results: QueryResult = await db('wanderlists')
        .where('id', id)
        .update({ ...data })
        .returning('*');

    if (results.length !== 1) {
        return null;
    }

    const result = results[0];

    return result;
}

export async function deleteCollection(data): Promise<number> {
    const result: QueryResult = await db('wanderlists')
        .where('id', data.id)
        .del();

    if (result !== 1) {
        return null;
    }

    return result;
}

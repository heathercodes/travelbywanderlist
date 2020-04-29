import { db } from '../db';
import { QueryResult } from 'pg';

export async function createCollection(data) {
    const results: QueryResult = await db('wanderlists').insert(data).returning('id');

    if (results.length !== 1) {
        return null;
    }

    const result = results[0];

    return result;
}

export async function getCollectionById(data) {
    const results: QueryResult = await db('wanderlists').where('id', data.id);

    if (results.length !== 1) {
        return null;
    }

    const result = results[0];

    return result;
}

export async function updateCollection(data) {
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

export async function deleteCollection(data) {
    const result: QueryResult = await db('wanderlists')
        .where('id', data.id)
        .del()

    if (result !== 1) {
        return null;
    }

    return result;
}

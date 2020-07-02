import { Collection, CollectionUpdate } from '../models';
import { db } from '../db';

export async function createCollection(data: CollectionUpdate): Promise<Collection> {
    const results = await db('wanderlists').insert(data).returning('*');

    if (!results) {
        throw new Error('createCollection error');
    }

    return results[0];
}

export async function getCollectionById(data: { id: number }): Promise<Collection> {
    const results = await db('wanderlists').where('id', data.id);

    if (!results) {
        throw new Error('getCollectionById error');
    }

    return results[0];
}

export async function updateCollection(data: CollectionUpdate): Promise<Collection> {
    const { id } = data;

    const results = await db('wanderlists')
        .where('id', id)
        .update({ ...data })
        .returning('*');

    if (!results) {
        throw new Error('updateCollection error');
    }

    return results[0];
}

export async function deleteCollection(data: { id: number }): Promise<number> {
    const result = await db('wanderlists').where('id', data.id).del();

    if (!result) {
        throw new Error('deleteCollection error');
    }

    return result;
}

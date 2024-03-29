import { Collection, CollectionUpdate, KnexResponse } from '../models';
import { db } from '../db';

export async function createCollection({
    name,
    userId
}: {
    name: string;
    userId: number;
}): Promise<Collection> {
    const results: KnexResponse = await db.raw(
        'insert into "wanderlists" ("name", "user_id") values (?, ?) returning *',
        [name, userId]
    );

    return results.rows[0];
}

export async function getCollectionById(data: { id: number }): Promise<Collection> {
    const results: KnexResponse = await db.raw(
        'select * from "wanderlists" where "id" = ? order by "updatedAt" asc',
        [data.id]
    );

    return results.rows[0];
}

export async function getCollectionByUserId(data: { id: number }): Promise<Collection> {
    const results: KnexResponse = await db.raw('select * from "wanderlists" where "user_id" = ?', [
        data.id
    ]);

    return results.rows[0];
}

export async function updateCollection(data: CollectionUpdate): Promise<Collection> {
    const results: KnexResponse = await db.raw(
        'update "wanderlists" set "name" = ? where "id" = ? returning *',
        [data.name, data.id]
    );

    return results.rows[0];
}

export async function deleteCollection(data: { id: number }): Promise<number> {
    const result = await db.raw('delete from "wanderlists" where "id" = ? returning "id"', [
        data.id
    ]);

    if (!result.rows[0]) {
        return 0;
    }

    return data.id;
}

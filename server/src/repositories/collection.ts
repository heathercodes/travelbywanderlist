import { Collection, CollectionUpdate, KnexResponse } from '../models';
import { db } from '../db';

export async function createCollection(data: CollectionUpdate): Promise<Collection> {
    const results: KnexResponse = await db.raw(
        'insert into "wanderlists" ("name") values (?) returning *',
        [data.name]
    );

    return results.rows[0];
}

export async function getCollectionById(data: { id: number }): Promise<Collection> {
    const results: KnexResponse = await db.raw('select * from "wanderlists" where "id" = ?', [
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

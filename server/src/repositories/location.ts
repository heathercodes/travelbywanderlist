import { Location, UpdateLocationReq, KnexResponse } from '../models';
import { db } from '../db';

export async function createLocation(data: {
    name: string;
    latitude: number;
    longitude: number;
    wanderlist_id: number;
    image_url?: string;
    description?: string;
}): Promise<Location> {
    let columns = ['"latitude"', '"longitude"', '"name"', '"wanderlist_id"'];
    let args = [data.latitude, data.longitude, data.name, data.wanderlist_id];

    const values = `?, ?, ?, ?${data.image_url ? ', ?' : ''}${data.description ? ', ?' : ''}`;

    if (data.image_url) {
        args = [...args, data.image_url];
        columns = [...columns, '"image_url"'];
    }

    if (data.description) {
        args = [...args, data.description];
        columns = [...columns, '"description"'];
    }

    const formattedColumns = columns.join(', ');

    const results: KnexResponse = await db.raw(
        `insert into "locations" (${formattedColumns}) values (${values}) returning *`,
        args
    );

    return results.rows[0];
}

export async function getLocationById(data: { id: number }): Promise<Location> {
    const results: KnexResponse = await db.raw('select * from "locations" where "id" = ?', [
        data.id
    ]);

    return results.rows[0];
}

export async function deleteLocationById(data: { id: number }): Promise<number> {
    const result: KnexResponse = await db.raw(
        'delete from "locations" where "id" = ? returning "id"',
        [data.id]
    );

    if (!result.rows[0]) {
        return 0;
    }

    return data.id;
}

// functions used for collections
export async function updateLocation(data: UpdateLocationReq): Promise<Location> {
    let args: any = [];
    let columns: any = [];

    if (data.latitude) {
        args = [...args, data.latitude];
        columns = [...columns, '"latitude" = ?'];
    }

    if (data.longitude) {
        args = [...args, data.longitude];
        columns = [...columns, '"longitude" = ?'];
    }

    if (data.name) {
        args = [...args, data.name];
        columns = [...columns, '"name" = ?'];
    }

    if (data.image_url) {
        args = [...args, data.image_url];
        columns = [...columns, '"image_url" = ?'];
    }

    if (data.description) {
        args = [...args, data.description];
        columns = [...columns, '"description" = ?'];
    }

    const formattedColumns = columns.join(', ');

    const results: KnexResponse = await db.raw(
        `update "locations" set ${formattedColumns} where "id" = ? and "wanderlist_id" = ? returning *`,
        [...args, data.id, data.wanderlist_id]
    );

    return results.rows[0];
}

export async function deleteLocationByCollectionId(data: { id: number }): Promise<number> {
    const result: KnexResponse = await db.raw(
        'delete from "locations" where "wanderlist_id" = ? returning "id"',
        [data.id]
    );

    if (!result.rows[0]) {
        return 0;
    }

    return data.id;
}

export async function getLocationsByCollectionId(data: { id: number }): Promise<Location[]> {
    const results: KnexResponse = await db.raw(
        'select * from "locations" where "wanderlist_id" = ?',
        [data.id]
    );

    return results.rows;
}

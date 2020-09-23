import { Location, UpdateLocationReq } from '../models';
import { db } from '../db';

export async function createLocation(data: {
    name: string;
    latitude: number;
    longitude: number;
    wanderlist_id?: number;
}): Promise<Location> {
    const results = await db('locations').insert(data).returning('*');

    return results[0];
}

export async function getLocationById(data: { id: number }): Promise<Location> {
    const results = await db('locations').where('id', data.id);

    return results[0];
}

export async function updateLocation(data: UpdateLocationReq): Promise<Location> {
    const results = await db('locations')
        .where('id', data.id)
        .update({ ...data })
        .returning('*');

    return results[0];
}

export async function deleteLocationById(data: { id: number }): Promise<number> {
    const result = await db('locations').where('id', data.id).del();

    if (!result) {
        return 0;
    }

    return data.id;
}

// functions used for collections
export async function deleteLocationByCollectionId(data: { id: number }): Promise<number> {
    const result = await db('locations').where('wanderlist_id', data.id).del();

    return result;
}

export async function getLocationsByCollectionId(data: { id: number }): Promise<Location[]> {
    const results = await db('locations').where('wanderlist_id', data.id);

    return results;
}

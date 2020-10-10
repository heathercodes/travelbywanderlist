import { Location, UpdateLocationReq } from '../models';
import * as locationRepo from '../repositories/location';

export async function createLocation(data: {
    name: string;
    latitude: number;
    longitude: number;
    wanderlist_id: number;
}): Promise<Location> {
    const location = await locationRepo.createLocation(data);

    if (!location) {
        return Promise.reject(new Error('createLocation error'));
    }

    return location;
}

export async function getLocationById(data: { id: number }): Promise<Location | void> {
    const location = await locationRepo.getLocationById(data);

    if (!location) {
        return Promise.reject(new Error('getLocationById error: location not found'));
    }

    return location;
}

export async function updateLocation(data: UpdateLocationReq): Promise<Location> {
    const location = await locationRepo.updateLocation(data);

    if (!location) {
        return Promise.reject(new Error('updateLocation error'));
    }

    return location;
}

export async function deleteLocationById(data: { id: number }): Promise<number> {
    const id = await locationRepo.deleteLocationById(data);

    if (!id) {
        return Promise.reject(new Error('deleteLocationById error'));
    }

    return id;
}

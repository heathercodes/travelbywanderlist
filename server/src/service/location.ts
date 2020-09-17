import { Location, UpdateLocationReq } from '../models';
import * as locationRepo from '../repositories/location';

export async function createLocation(data: {
    name: string;
    latitude: number;
    longitude: number;
}): Promise<Location> {
    const locations = await locationRepo.createLocation(data);

    return locations;
}

export async function getLocationById(data: { id: number }): Promise<Location | void> {
    const locations = await locationRepo.getLocationById(data);

    return locations;
}

export async function updateLocation(data: UpdateLocationReq): Promise<Location> {
    const locations = await locationRepo.updateLocation(data);

    return locations;
}

export async function deleteLocationById(data: { id: number }): Promise<number> {
    const id = await locationRepo.deleteLocationById(data);

    return id;
}

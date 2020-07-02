import { Location, UpdateLocationReq } from '../models';
import * as locationRepo from '../repositories/location';

export async function createLocation(data: {
    name: string;
    latitude: number;
    longitude: number;
}): Promise<Location> {
    const location = await locationRepo.createLocation(data);

    return location;
}

export async function getLocationById(data: { id: number }): Promise<Location | void> {
    const location = await locationRepo.getLocationById(data);

    return location;
}

export async function updateLocation(data: UpdateLocationReq): Promise<Location> {
    const location = await locationRepo.updateLocation(data);

    return location;
}

export async function deleteLocationById(data: { id: number }): Promise<number> {
    const id = await locationRepo.deleteLocationById(data);

    return id;
}
